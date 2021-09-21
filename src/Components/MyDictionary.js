import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function MyDictionary() {
    const [wordsList, setWordsList] = useState([]);
    const [newWord, setNewWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [deleteConfirmBox, setDeleteConfirmBox] = useState({isOpen: false, key: {}});
    const [openEditBox, setOpenEditBox] = useState({isOpen: false, item: {}});
    const classes = useStyles();

    useEffect(() => {
          getWordsList()
        }, []
    )

    let getWordsList=()=>{
        axios.get(`https://dictionary-d48c1-default-rtdb.firebaseio.com/words.json`)
            .then(response => {
                setWordsList(Object.entries(response.data).reverse().map(([key, value]) => {
                    return {
                        ...value,
                        key
                    }
                }))
            })
            .catch(() => {
            })
            .finally(() => {
            })
    }


    function addWord(word, definition) {
        setWordsList(wordsList => [
                {
                    word,
                    definition,
                },
            ...wordsList
            ]
        );
    }

    function addNewWord(e) {
        if(!newWord && !definition ){
            return
        }
        e.preventDefault();
        axios.post(`https://dictionary-d48c1-default-rtdb.firebaseio.com/words.json`, {
            word: newWord,
            definition: definition
        })
            .then(() => {
                addWord(newWord, definition);
                setNewWord('');
                setDefinition('');
                getWordsList()
            })
            .catch(() => {
            })
            .finally(() => {
            })
    }

    let inputWordHandler = e => setNewWord(e.target.value)
    let inputDefinitionHandler = e => setDefinition(e.target.value)
    let wordsEditHandler =e => setOpenEditBox({isOpen: true, item: {key:openEditBox.item.key,word:e.target.value,definition:openEditBox.item.definition}})
    let definitionsEditHandler =e=>  setOpenEditBox({isOpen: true, item: {key:openEditBox.item.key,word:openEditBox.item.word,definition:e.target.value}})
    let editModalHandler =item=> setOpenEditBox({isOpen: true, item})
    let deleteModalHandler =key=>setDeleteConfirmBox({isOpen: true, key})


    function deleteWord() {
        axios.delete(`https://dictionary-d48c1-default-rtdb.firebaseio.com/words/${deleteConfirmBox.key}.json`)
            .then(() => {
                    let filteredWordsList = wordsList.filter((row) => row.key !== deleteConfirmBox.key)
                    setWordsList(
                        filteredWordsList
                    )
                }
            )
            .catch(() => {
            })
            .finally(() => {
                setDeleteConfirmBox({isOpen: false, key: {}})
            });
    }

    let editWord =()=>{
        console.log(openEditBox)
        axios.put(`https://dictionary-d48c1-default-rtdb.firebaseio.com/words/${openEditBox.item.key}.json`,{
            key :openEditBox.item.key,
            word: openEditBox.item.word,
            definition: openEditBox.item.definition,
        })
            .then(()=>{setOpenEditBox({isOpen: false, item: {}})})
            .catch(() => {})
            .finally(()=>{getWordsList()});
    }

    return (
        <div>
            <div>
                <div className='container text-center p-5'>
                    <div className='row'>
                        <div className='col-12 col-lg-5 my-2'>
                            <TextField
                                id="outlined-textarea"
                                placeholder="write the word"
                                value={newWord}
                                multiline
                                variant="outlined"
                                className='w-100'
                                onChange={inputWordHandler}
                            />
                        </div>
                        <div className='col-12 col-lg-5 my-2'>
                            <TextField
                                id="outlined-textarea"
                                placeholder="Write your definition"
                                value={definition}
                                multiline
                                variant="outlined"
                                className='w-100'
                                onChange={inputDefinitionHandler}
                            />
                        </div>
                        <div className='col-12 col-lg-2 my-auto my-2'>
                            <Button variant="contained" color="secondary"
                                    onClick={addNewWord}>
                                ADD
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <TableContainer component={Paper} className='p-5 table-bordered'>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Words</TableCell>
                                    <TableCell align="left">Definitions</TableCell>
                                    <TableCell align="left">edit</TableCell>
                                    <TableCell align="left">delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {wordsList.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="left">{row.word}</TableCell>
                                        <TableCell align="left">{row.definition}</TableCell>
                                        <TableCell align="left" onClick={() => {
                                            editModalHandler(row)
                                        }}>edit</TableCell>
                                        <TableCell align="left" onClick={() => {
                                            deleteModalHandler(row.key)
                                        }}>delete</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/*DELETE_DIALOG*/}
                    <Dialog
                        dir="ltr"
                        open={deleteConfirmBox.isOpen}
                        keepMounted
                        onClose={() => setDeleteConfirmBox({isOpen: false, key: {}})}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                "Do you want to delete this word?"
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDeleteConfirmBox({isOpen: false, key: {}})}>
                                close
                            </Button>
                            <Button color="secondary" onClick={() => deleteWord(deleteConfirmBox)}>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/*EDIT_DIALOG*/}
                    <Dialog
                        dir="ltr"
                        open={openEditBox.isOpen}
                        keepMounted
                        onClose={() => setOpenEditBox({isOpen: false, item: {}})}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                            </DialogContentText>
                            <div className='container text-center p-5'>
                                <div className='row'>
                                    <div className='col-12 col-lg-5 my-2'>
                                        <TextField
                                            id="outlined-textarea"
                                            placeholder="write the word"
                                            multiline
                                            value={openEditBox.item.word}
                                            variant="outlined"
                                            className='w-100'
                                            onChange={wordsEditHandler}
                                        />
                                    </div>
                                    <div className='col-12 col-lg-5 my-2'>
                                        <TextField
                                            id="outlined-textarea"
                                            placeholder="Write your definition"
                                            multiline
                                            value={openEditBox.item.definition}
                                            variant="outlined"
                                            className='w-100'
                                            onChange={definitionsEditHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenEditBox({isOpen: false, item: {}})}>
                                close
                            </Button>
                            <Button color="secondary" onClick={()=>editWord(openEditBox)}>
                                Edit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}


export default MyDictionary
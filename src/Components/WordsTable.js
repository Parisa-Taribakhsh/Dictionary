import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, TextField,
} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function WordsTable(props) {
    const classes = useStyles();
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [openEditBox, setOpenEditBox] = useState({isOpen: false, item: {}});

    return (
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
                        {props.wordsList.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell align="left">{row.word}</TableCell>
                                <TableCell align="left">{row.definition}</TableCell>
                                <TableCell align="left" onClick={() => {
                                    setOpenEditBox({isOpen: true, item: row})
                                }}>edit</TableCell>
                                <TableCell align="left" onClick={() => {
                                    setOpenDeleteConfirm(true)
                                }}>delete</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*DELETE_DIALOG*/}
            <Dialog
                dir="ltr"
                open={openDeleteConfirm}
                keepMounted
                onClose={() => setOpenDeleteConfirm(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        "Do you want to delete this word?"
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteConfirm(false)}>
                        close
                    </Button>
                    <Button color="secondary">
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
                                />
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditBox({isOpen: false, item: {}})}>
                        close
                    </Button>
                    <Button color="secondary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

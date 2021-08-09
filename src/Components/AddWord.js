import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";

export default function AddWord(props) {
    const [newWord, setNewWord] = useState('');
    const [definition, setDefinition] = useState('');

    function addNewWord(e) {
        e.preventDefault();
        props.add(newWord, definition);
        console.log(newWord, definition)
    }

    let inputWordHandler = e => setNewWord(e.target.value)

    let inputDefinitionHandler = e => setDefinition(e.target.value)

    return (
        <div className='container text-center p-5'>
            <div className='row'>
                <div className='col-12 col-lg-5 my-2'>
                    <TextField
                        id="outlined-textarea"
                        placeholder="write the word"
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
                        multiline
                        variant="outlined"
                        className='w-100'
                        onChange={inputDefinitionHandler}
                    />
                </div>
                <div className='col-12 col-lg-2 my-auto my-2'>
                    <Button variant="contained" color="secondary" onClick={!!newWord && !!definition ? addNewWord : ''}>
                        ADD
                    </Button>
                </div>
            </div>
        </div>
    )

}

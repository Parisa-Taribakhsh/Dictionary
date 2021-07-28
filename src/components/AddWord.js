import React from 'react';
import {Button, TextField} from "@material-ui/core";

export default function AddWord(){

    return(
        <div className='container text-center p-5'>
            <div className='row'>
                <div className='col-12 col-lg-5 my-2'>
                    <TextField
                        id="outlined-textarea"
                        placeholder="write the word"
                        multiline
                        variant="outlined"
                        className='w-100'
                    />
                </div>
                <div className='col-12 col-lg-5 my-2'>
                    <TextField
                        id="outlined-textarea"
                        placeholder="Write your definition"
                        multiline
                        variant="outlined"
                        className='w-100'
                    />
                </div>
                <div className='col-12 col-lg-2 my-auto my-2'>
                    <Button variant="contained" color="secondary" >
                        ADD
                    </Button>
                </div>
            </div>
            </div>
    )

}

import React from 'react';
import {TextField, Button} from '@material-ui/core';
import WordsTable from "./WordsTable";
import AddWord from "./AddWord";


function MyDictionary() {

    return (
       <div>
           <div>
               <AddWord/>
           </div>
            <div>
                <WordsTable/>
            </div>
        </div>
    )
}

export default MyDictionary
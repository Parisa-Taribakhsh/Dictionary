import React, {useState} from 'react';
import WordsTable from "./WordsTable";
import AddWord from "./AddWord";

function MyDictionary() {
    const [wordsList, setWordsList] = useState([{
        word: '',
        definition: ''
    }]);

    function addWord(newWord, definition) {
        setWordsList(wordsList => [
                ...wordsList,
                {
                    word: newWord,
                    definition,
                }
            ]
        );
    }

    return (
        <div>
            <div>
                <AddWord add={addWord}/>
            </div>
            <div>
                <WordsTable wordsList={wordsList}/>
            </div>
        </div>
    )
}

export default MyDictionary
import {SET_WORDS_LIST} from "../types";

export const setWordsList = (wordsList) => {
    return {
        type: SET_WORDS_LIST,
        key : wordsList.item,
        word: wordsList.word,
        definition: wordsList.definition
    }
}
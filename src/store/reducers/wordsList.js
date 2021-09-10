import {SET_WORDS_LIST} from "../types";

export const wordsList = (state={key:'',word:'',definition:''} , action) => {
    switch (action.type) {
        case SET_WORDS_LIST:
            return {
                ...state,
                key:action.key,
                word: action.word,
                definition: action.definition
            }
        default:
            return state;
    }
}
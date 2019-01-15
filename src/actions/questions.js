import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading"


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_VOTE = 'ADD_VOTE'

export function addVote( {qid, answer, authedUser} ) {
    return {
        type: ADD_VOTE,
        qid,
        answer,
        authedUser,
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddVote(info) {
    return (dispatch) => {
        dispatch(addVote(info))

        return saveQuestionAnswer(info)
            .catch((e) => {
                console.warn("Warning: Failed to save question answer: ", e)
                alert('There was an error saving your answer')
            })
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const {authedUser} = getState()

        dispatch(showLoading())
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser.userId,
        })
            .then((question) => {
                dispatch(addQuestion(question))
            })
            .then(() => {
                dispatch(hideLoading())
            })
            .catch((e) => {
                console.warn("Failed to add question: ", optionOneText, optionTwoText)
                alert("Failed to add question")
            })
    }
}

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}


import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
} from './_DATA.js'
import {_saveQuestionAnswer} from "./_DATA";

export function getInitialData () {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveQuestion(q) {
    return _saveQuestion(q)
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info)
}


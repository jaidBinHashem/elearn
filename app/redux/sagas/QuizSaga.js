import { put, call } from "redux-saga/effects";
import { SET_QUIZ_DONE, SIGN_OUT, SUBMIT_QUIZ_RETURN } from '../actions/types';

import { getService } from '../../network'

const retriveQuizDetails = async () => {
    try {
        let request = {
            endPoint: '',
            baseUrl: 'https://pastebin.com/raw/QXSLsxEv',
            temp: true
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};


export const setQuiz = function* (action) {
    let quizDetails = yield call(retriveQuizDetails);
    quizDetails.success && quizDetails.data && (yield put({ type: SET_QUIZ_DONE, payload: quizDetails.data }));
};

export const submitQuiz = function* (action) {
    yield put({
        type: SUBMIT_QUIZ_RETURN,
        payload: action.payload
    });
};
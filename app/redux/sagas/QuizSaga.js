import { put, call } from "redux-saga/effects";
import { SET_QUIZ_DONE, SIGN_OUT } from '../actions/types';

import { getService } from '../../network'

const retriveQuizDetails = async () => {
    try {
        let request = {
            endPoint: '',
            baseUrl : 'https://pastebin.com/raw/QXSLsxEv',
            temp: true
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};



export const setQuiz = function* (action) {
    let quizDetails = yield call(retriveQuizDetails);
    console.log(quizDetails, "here");
    quizDetails.success && quizDetails.data && (yield put({ type: SET_QUIZ_DONE, payload: quizDetails.data }));
};
import { put, call } from "redux-saga/effects";
import { GET_BLOGS_RETURN, SIGN_OUT } from '../actions/types';

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
    // blogs.success && blogs.data && (yield put({ type: GET_BLOGS_RETURN, payload: blogs.data.data }));
};
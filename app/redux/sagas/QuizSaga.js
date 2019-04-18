import { put, call } from "redux-saga/effects";
import { SET_QUIZ_DONE, SIGN_OUT, SUBMIT_QUIZ_RETURN, GET_PREVIOUS_ATTEMPS_RETURN } from '../actions/types';

import { getService, postService } from '../../network'

const retriveQuizDetails = async () => {
    try {
        let request = {
            endPoint: '',
            baseUrl: 'http://172.16.228.145:8080/api/quiz/51/questions',
            authenticate: true,
            temp: true
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};

const submitQuizResults = async (payload) => {
    let answers = [...payload.answers]
    try {
        let request = {
            endPoint: '',
            baseUrl: 'http://172.16.228.145:8080/api/quiz/51/questions',
            authenticate: true,
            temp: true,
            params: {
                'questions': answers
            }
        }
        return (await postService(request));
    } catch (error) {
        return false;
    }
};

const retrivePreviousAttemps = async () => {
    try {
        let request = {
            endPoint: '',
            baseUrl: 'http://172.16.228.145:8080/api/quiz/51/attempts',
            authenticate: true,
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
    let submitAnswers = yield call(submitQuizResults, action.payload);
    console.log(submitAnswers, "here");
    yield put({
        type: SUBMIT_QUIZ_RETURN,
        payload: action.payload
    });
};

export const getPreviousAttemps = function* (action) {
    let attemps = yield call(retrivePreviousAttemps);
    console.log(attemps, "attemps");
    attemps.success && attemps.data && (yield put({ type: GET_PREVIOUS_ATTEMPS_RETURN, payload: attemps.data }));
};
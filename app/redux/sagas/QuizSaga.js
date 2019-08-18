import { put, call } from "redux-saga/effects";
import { SET_QUIZ_DONE, SIGN_OUT, SUBMIT_QUIZ_RETURN, GET_PREVIOUS_ATTEMPS_RETURN } from '../actions/types';

import { getService, postService } from '../../network'

const retriveQuizDetails = async (lessonId) => {
    try {
        let request = {
            endPoint: 'quiz/' + lessonId + '/questions',
            showLoader: true,
            authenticate: true,
            temp: false
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
            endPoint: 'quiz/' + payload.lessonId + '/questions',
            // baseUrl: 'http://172.16.228.145:8080/api/quiz/51/questions',
            authenticate: true,
            temp: false,
            params: {
                'questions': answers
            }
        }
        return (await postService(request));
    } catch (error) {
        return false;
    }
};

const retrivePreviousAttemps = async (lessonId) => {
    try {
        let request = {
            endPoint: 'quiz/' + lessonId + '/leaderboard',
            // baseUrl: 'http://172.16.228.145:8080/api/quiz/51/attempts',
            authenticate: true,
            temp: false
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};


export const setQuiz = function* (action) {
    let quizDetails = yield call(retriveQuizDetails, action.payload);
    console.log(quizDetails, "quiz details");
    quizDetails.success && quizDetails.data && (yield put({ type: SET_QUIZ_DONE, payload: quizDetails.data }));
};

export const submitQuiz = function* (action) {
    let submitAnswers = yield call(submitQuizResults, action.payload);
    yield put({
        type: SUBMIT_QUIZ_RETURN,
        payload: action.payload
    });
};

export const getPreviousAttemps = function* (action) {
    let attemps = yield call(retrivePreviousAttemps, action.payload);
    attemps.success && attemps.data && (yield put({ type: GET_PREVIOUS_ATTEMPS_RETURN, payload: attemps.data }));
};
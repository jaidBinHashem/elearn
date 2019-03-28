import { takeEvery } from "redux-saga/effects";
import { signOut, makeLoginRequest, isAuthenticated, makeSignUpRequest, saveStudyDetails, saveCourses, registerUser } from './AuthSaga';
import { getScholarships } from './ScholarshipsSaga';
import { getBlogs } from './BlogsSaga';
import { setQuiz } from './QuizSaga';

import {SET_QUIZ, GET_BLOGS, SIGN_OUT, MAKE_LOGIN_REQUEST, CHECK_AUTH, SIGN_UP, SUBMIT_STUDY_DETAILS, SUBMIT_COURSES, REGISTER_USER, GET_SCHOLARSHIPS } from '../actions/types'

export function* rootSaga() {
    yield takeEvery(CHECK_AUTH, isAuthenticated);
    yield takeEvery(SIGN_UP, makeSignUpRequest);
    yield takeEvery(SUBMIT_STUDY_DETAILS, saveStudyDetails);
    yield takeEvery(SUBMIT_COURSES, saveCourses);
    yield takeEvery(REGISTER_USER, registerUser);
    yield takeEvery(MAKE_LOGIN_REQUEST, makeLoginRequest);
    yield takeEvery(GET_SCHOLARSHIPS, getScholarships);
    yield takeEvery(GET_BLOGS, getBlogs);
    yield takeEvery(SET_QUIZ, setQuiz);
    yield takeEvery(SIGN_OUT, signOut);
}

export default rootSaga;
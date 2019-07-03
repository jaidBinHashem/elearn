import { takeEvery } from "redux-saga/effects";
import { signOut, makeLoginRequest, isAuthenticated, makeSignUpRequest, saveStudyDetails, saveCourses, registerUser } from './AuthSaga';
import { getScholarships } from './ScholarshipsSaga';
import { getBlogs } from './BlogsSaga';
import { setQuiz, submitQuiz, getPreviousAttemps } from './QuizSaga';
import { getSubjects, getSubjectDetails, getAllSubjects } from './SubjectsSaga';
import { getPackages, submitBuyPackages } from './PackageSaga';
import { getCategories, setCategories } from './CategorySaga';
import { getUser, editUser, updateStudyLevels } from './UserSaga';
import { getCoupons, addCoupon } from './CouponSaga';

import {ADD_COUPON, GET_COUPONS, UPDATE_STUDY, EDIT_USER, GET_USER, SET_CATEGORIES, GET_CATEGORIES, GET_ALL_SUBJECTS, SUBMIT_BUY_PKG, GET_PACKAGES, GET_SUBJECT_DETAILS, GET_SUBJECTS, SUBMIT_QUIZ, SET_QUIZ, GET_BLOGS, SIGN_OUT, MAKE_LOGIN_REQUEST, CHECK_AUTH, SIGN_UP, SUBMIT_STUDY_DETAILS, SUBMIT_COURSES, REGISTER_USER, GET_SCHOLARSHIPS, GET_PREVIOUS_ATTEMPS } from '../actions/types'

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
    yield takeEvery(SUBMIT_QUIZ, submitQuiz);
    yield takeEvery(GET_PREVIOUS_ATTEMPS, getPreviousAttemps);
    yield takeEvery(SIGN_OUT, signOut);
    yield takeEvery(GET_SUBJECTS, getSubjects);
    yield takeEvery(GET_ALL_SUBJECTS, getAllSubjects);
    yield takeEvery(GET_SUBJECT_DETAILS, getSubjectDetails);
    yield takeEvery(GET_PACKAGES, getPackages);
    yield takeEvery(SUBMIT_BUY_PKG, submitBuyPackages);
    yield takeEvery(GET_CATEGORIES, getCategories);
    yield takeEvery(SET_CATEGORIES, setCategories);
    yield takeEvery(GET_USER, getUser);
    yield takeEvery(EDIT_USER, editUser);
    yield takeEvery(UPDATE_STUDY, updateStudyLevels);
    yield takeEvery(GET_COUPONS, getCoupons);
    yield takeEvery(ADD_COUPON, addCoupon);
}

export default rootSaga;
import { put, call } from "redux-saga/effects";
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import { GET_SUBJECTS_RETURN, GET_SUBJECT_DETAILS_RETURN, GET_ALL_SUBJECTS_RETURN } from '../actions/types';

import { getService } from '../../network'

const retrieveSubjects = async () => {
    try {
        let request = {
            endPoint: 'user/courses',
            authenticate: true,
            showLoader: true
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};

const retrieveAllSubjects = async () => {
    try {
        let request = {
            endPoint: 'user/all-courses',
            authenticate: true,
            showLoader: true
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};

const retrieveSubjectDetails = async (payload) => {
    try {
        let request = {
            endPoint: 'user/courses/' + payload,
            authenticate: true,
            showLoader: true
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};



export const getSubjects = function* (action) {
    let subjects = yield call(retrieveSubjects);
    subjects.success && subjects.data && (yield put({ type: GET_SUBJECTS_RETURN, payload: subjects.data.data }));
};

export const getAllSubjects = function* (action) {
    let subjects = yield call(retrieveAllSubjects);
    subjects.success && subjects.data && (yield put({ type: GET_ALL_SUBJECTS_RETURN, payload: subjects.data.data }));
};

export const getSubjectDetails = function* (action) {
    let subjectDetails = yield call(retrieveSubjectDetails, action.payload);
    subjectDetails.success && subjectDetails.data && (yield put({ type: GET_SUBJECT_DETAILS_RETURN, payload: subjectDetails.data.data }));
    loaderHandler.hideLoader();
};
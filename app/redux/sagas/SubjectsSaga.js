import { put, call } from "redux-saga/effects";
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import { GET_SUBJECTS_RETURN, GET_SUBJECT_DETAILS_RETURN } from '../actions/types';

import { getService } from '../../network'

const retrieveSubjects = async () => {
    try {
        let request = {
            endPoint: '',
            baseUrl: 'http://172.16.228.145:8080/api/user/courses',
            temp: true,
            authenticate: true
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};

const retrieveSubjectDetails = async () => {
    try {
        let request = {
            endPoint: '',
            baseUrl: 'http://172.16.228.145:8080/api/user/courses/advanced-angular-4-development',
            temp: true,
            authenticate: true
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

export const getSubjectDetails = function* (action) {
    let subjectDetails = yield call(retrieveSubjectDetails);
    subjectDetails.success && subjectDetails.data && (yield put({ type: GET_SUBJECT_DETAILS_RETURN, payload: subjectDetails.data.data }));
    loaderHandler.hideLoader();
};
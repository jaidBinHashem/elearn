import { put, call } from "redux-saga/effects";
import { GET_CATEGORIES, GET_SCHOLARSHIPS, GET_USER, SET_USER_MYPROFILE, GET_ALL_SUBJECTS } from '../actions/types';

import { getService, postService } from '../../network'

const retrieveUser = async () => {
    try {
        let request = {
            endPoint: 'user/profile',
            authenticate: true,
            showLoader: true
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};


const editUserCall = async (user) => {
    try {
        let request = {
            endPoint: 'user/profile',
            authenticate: true,
            showLoader: true,
            contentType: "multipart/form-data",
            params: user,
        }
        return (await postService(request));
    } catch (error) {
        return false;
    }
};

const pushStudyUpdate = async (studyDetails) => {
    try {
        let request = {
            endPoint: 'user/study-level',
            authenticate: true,
            showLoader: true,
            params: studyDetails,
        }
        return (await postService(request));
    } catch (error) {
        return false;
    }
};



export const getUser = function* (action) {
    let user = yield call(retrieveUser);
    user.success && user.data && (yield put({ type: SET_USER_MYPROFILE, payload: user.data.data }));
};

export const editUser = function* (action) {
    let user = yield call(editUserCall, action.payload);
    user.success && (yield put({ type: GET_USER }));
};

export const updateStudyLevels = function* (action) {
    let update = yield call(pushStudyUpdate, action.payload);
    update.success && (yield put({ type: GET_USER }));
};

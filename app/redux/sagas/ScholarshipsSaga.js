import { put, call } from "redux-saga/effects";
import { GET_SCHOLARSHIPS_RETURN, SIGN_OUT } from '../actions/types';

import { getService } from '../../network'

const retrieveScorlarships = async () => {
    try {
        let request = {
            endPoint: 'scholarships',
            authenticate: true
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};



export const getScholarships = function* (action) {
    let scholarships = yield call(retrieveScorlarships);
    !scholarships.success && scholarships.errorCode === 401 && (yield put({ type: SIGN_OUT }));
    scholarships.success && scholarships.data && scholarships.data.data.length >= 0 && (yield put({ type: GET_SCHOLARSHIPS_RETURN, payload: scholarships.data.data }));
};
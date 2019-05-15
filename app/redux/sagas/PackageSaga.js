import { put, call } from "redux-saga/effects";
import { GET_PACKAGES_RETURN } from '../actions/types';

import { getService } from '../../network'

const retrievePackages = async () => {
    try {
        let request = {
            endPoint: '',
            baseUrl: 'https://pastebin.com/raw/JgHsnhAZ',
            temp: true,
            showLoader: true
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};



export const getPackages = function* (action) {
    let packages = yield call(retrievePackages);
    packages.success && packages.data && (yield put({ type: GET_PACKAGES_RETURN, payload: packages.data.data.subjects }));
};
import { put, call } from "redux-saga/effects";
import { GET_PACKAGES_RETURN, SUBMIT_BUY_PKG_RETURN } from '../actions/types';

import { getService, postService } from '../../network'

const retrievePackages = async () => {
    try {
        let request = {
            endPoint: 'user/packages',
            showLoader: true,
            authenticate: true
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};

const submitPackages = async (payload) => {
    let selectedPkgs = [...payload.selectedPackages];
    try {
        let request = {
            endPoint: 'initialize-payment',
            authenticate: true,
            params: {
                'subjects': selectedPkgs
            }
        }
        return (await postService(request));
    } catch (error) {
        return false;
    }
};



export const getPackages = function* (action) {
    let packages = yield call(retrievePackages);
    packages.success && packages.data && (yield put({ type: GET_PACKAGES_RETURN, payload: packages.data.data }));
};

export const submitBuyPackages = function* (action) {
    let response = yield call(submitPackages, action.payload);
    response.success && response.data && (yield put({ type: SUBMIT_BUY_PKG_RETURN, payload: response.data.data }));
};
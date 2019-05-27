import { put, call } from "redux-saga/effects";
import { GET_CATEGORIES_RETURN, SET_CATEGORIES_RETURN } from '../actions/types';

import { getService, postService } from '../../network'

const retrieveCategories = async () => {
    try {
        let request = {
            endPoint: 'user/categories',
            authenticate: true
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};

const setSelectedCategory = async (categoryID) => {
    try {
        let request = {
            endPoint: 'user/categories',
            authenticate: true,
            params: {
                'category': categoryID
            }
        }
        return (await postService(request));
    } catch (error) {
        return false;
    }
};



export const getCategories = function* (action) {
    let categories = yield call(retrieveCategories);
    categories.success && categories.data && categories.data.data.length >= 0 && (yield put({ type: GET_CATEGORIES_RETURN, payload: categories.data.data }));
};

export const setCategories = function* (action) {
    let response = yield call(setSelectedCategory, action.payload);
    response.success && (yield put({ type: SET_CATEGORIES_RETURN, payload: action.payload }));
};
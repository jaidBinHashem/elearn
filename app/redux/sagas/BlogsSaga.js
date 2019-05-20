import { put, call } from "redux-saga/effects";
import { GET_BLOGS_RETURN, SIGN_OUT } from '../actions/types';

import { getService } from '../../network'

const retrieveBlogs = async () => {
    try {
        let request = {
            endPoint: 'articles',
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};



export const getBlogs = function* (action) {
    let blogs = yield call(retrieveBlogs);
    blogs.success && blogs.data && (yield put({ type: GET_BLOGS_RETURN, payload: blogs.data.data }));
};
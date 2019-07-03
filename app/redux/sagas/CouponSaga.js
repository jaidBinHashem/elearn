import { put, call } from "redux-saga/effects";
import { GET_COUPONS_RETURN, ADD_COUPON_RETURN, RESET_ADD_COUPON, GET_COUPONS } from '../actions/types';
import { getService, postService } from '../../network';

import Toast from 'react-native-simple-toast';


const retrieveCoupons = async () => {
    try {
        let request = {
            endPoint: 'vouchers',
            authenticate: true,
            showLoader: true
        }
        return (await getService(request));
    } catch (error) {
        return false;
    }
};


const addUserCoupon = async (coupon) => {
    try {
        let request = {
            endPoint: 'vouchers',
            authenticate: true,
            showLoader: true,
            params: {
                'voucher': coupon
            }
        }
        return (await postService(request));
    } catch (error) {
        return false;
    }
};


export const getCoupons = function* (action) {
    let coupons = yield call(retrieveCoupons);
    coupons.success && coupons.data.data.length > 0 && (yield put({ type: GET_COUPONS_RETURN, payload: coupons.data.data }));
};

export const addCoupon = function* (action) {
    let response = yield call(addUserCoupon, action.payload);
    console.log(response, "here is the response");
    response.success && (yield put({ type: ADD_COUPON_RETURN }), Toast.show('Coupon added successfully'));
    response.success && (yield put({ type: GET_COUPONS }));
    response.success && (yield put({ type: RESET_ADD_COUPON }));
    !response.success && Toast.show(response.data.message);
};
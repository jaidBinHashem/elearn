import { GET_COUPONS, ADD_COUPON } from "./types";

export const getCoupons = () => {
    return {
        type: GET_COUPONS,
    };
};

export const addCoupon = (coupon) => {
    return {
        type: ADD_COUPON,
        payload: coupon
    };
};
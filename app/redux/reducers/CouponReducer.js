import { GET_COUPONS_RETURN, ADD_COUPON_RETURN, RESET_ADD_COUPON } from '../actions/types'
const initialState = {
    coupons: [],
    couponAdded: false
};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COUPONS_RETURN:
            return {
                ...state,
                coupons: action.payload
            }
        case ADD_COUPON_RETURN:
            return {
                ...state,
                couponAdded: true
            }
        case RESET_ADD_COUPON:
            return {
                ...state,
                couponAdded: false
            }
        default:
            return state;
    }
}
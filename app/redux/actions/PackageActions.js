import { GET_PACKAGES, PROCEED_PACKAGES, SUBMIT_BUY_PKG, RESET_SELECTED_PACKAGE } from "./types";

export const getPackages = () => {
    return {
        type: GET_PACKAGES,
    };
};

export const proceedPackages = (selectedPackages, totalPrice) => {
    return {
        type: PROCEED_PACKAGES,
        payload: {
            'selectedPackages': selectedPackages,
            'totalPrice': totalPrice
        }
    };
};

export const submitPackages = (selectedPackages, coupon) => {
    return {
        type: SUBMIT_BUY_PKG,
        payload: {
            'selectedPackages': selectedPackages,
            'counpon' : coupon
        }
    };
};

export const resetSelectedPackages = () => {
    return {
        type: RESET_SELECTED_PACKAGE,
    };
};
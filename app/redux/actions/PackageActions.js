import { GET_PACKAGES, PROCEED_PACKAGES, SUBMIT_BUY_PKG } from "./types";

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

export const submitPackages = (selectedPackages) => {
    return {
        type: SUBMIT_BUY_PKG,
        payload: {
            'selectedPackages': selectedPackages,
        }
    };
};
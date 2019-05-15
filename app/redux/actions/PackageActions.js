import { GET_PACKAGES, PROCEED_PACKAGES } from "./types";

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
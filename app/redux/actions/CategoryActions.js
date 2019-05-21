import { GET_CATEGORIES, SET_CATEGORIES } from "./types";

export const getCategories = () => {
    return {
        type: GET_CATEGORIES,
    };
};

export const setCategories = (categoryID) => {
    return {
        type: SET_CATEGORIES,
        payload : categoryID
    };
};
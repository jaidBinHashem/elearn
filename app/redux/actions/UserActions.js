import { GET_USER, EDIT_USER, UPDATE_STUDY } from "./types";

export const getUser = () => {
    return {
        type: GET_USER,
    };
};


export const editUser = (user) => {
    return {
        type: EDIT_USER,
        payload: user
    };
};


export const updateStudyLevel = (studyDetails) => {
    return {
        type: UPDATE_STUDY,
        payload: studyDetails
    };
};
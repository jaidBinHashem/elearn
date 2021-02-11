import { GET_SUBJECTS, GET_SUBJECT_DETAILS, GET_ALL_SUBJECTS } from "./types";

export const getSubjects = () => {
    return {
        type: GET_SUBJECTS,
    };
};

export const getAllSubjects = () => {
    return {
        type: GET_ALL_SUBJECTS,
    };
};

export const getSubjectDetails = (subjectSlug) => {
    return {
        type: GET_SUBJECT_DETAILS,
        payload: subjectSlug
    };
};
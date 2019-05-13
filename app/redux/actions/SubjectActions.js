import { GET_SUBJECTS, GET_SUBJECT_DETAILS } from "./types";

export const getSubjects = () => {
    return {
        type: GET_SUBJECTS,
    };
};

export const getSubjectDetails = (subjectSlug) => {
    return {
        type: GET_SUBJECT_DETAILS,
        payload: subjectSlug
    };
};
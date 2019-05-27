import { SET_QUIZ, SUBMIT_QUIZ, SHOW_EXPLANATION, GET_PREVIOUS_ATTEMPS } from "./types";

export const setQuiz = (lessonId) => {
    return {
        type: SET_QUIZ,
        payload: lessonId
    };
};

export const submitQuiz = (answers, selectedAnswersIdArray, rightAnswers, wrongAnswers, lessonId) => {
    return {
        type: SUBMIT_QUIZ,
        payload: {
            'answers': answers,
            'selectedAnswersIdArray': selectedAnswersIdArray,
            'rightAnswers': rightAnswers,
            'wrongAnswers': wrongAnswers,
            'lessonId': lessonId
        }
    };
};

export const showExplanation = (lessonId) => {
    return {
        type: SHOW_EXPLANATION,
        payload: lessonId
    };
};

export const getPreviousAttemps = (lessonId) => {
    return {
        type: GET_PREVIOUS_ATTEMPS,
        payload: lessonId
    };
};
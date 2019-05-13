import { SET_QUIZ, SUBMIT_QUIZ, SHOW_EXPLANATION, GET_PREVIOUS_ATTEMPS } from "./types";

export const setQuiz = () => {
    return {
        type: SET_QUIZ,
    };
};

export const submitQuiz = (answers, selectedAnswersIdArray, rightAnswers, wrongAnswers) => {
    return {
        type: SUBMIT_QUIZ,
        payload : {
            'answers' :answers,
            'selectedAnswersIdArray' : selectedAnswersIdArray,
            'rightAnswers' : rightAnswers,
            'wrongAnswers' : wrongAnswers
        }
    };
};

export const showExplanation = () => {
    return {
        type: SHOW_EXPLANATION,
    };
};

export const getPreviousAttemps = () => {
    return {
        type: GET_PREVIOUS_ATTEMPS,
    };
};
import { SET_QUIZ, SUBMIT_QUIZ, SHOW_EXPLANATION } from "./types";

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
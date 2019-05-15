import { SET_QUIZ_DONE, SUBMIT_QUIZ_RETURN, SHOW_EXPLANATION, GET_PREVIOUS_ATTEMPS_RETURN } from '../actions/types'
const initialState = {
  questions: null,
  time: 0,
  answers: [],
  selectedAnswersIdArray: [],
  rightAnswers: [],
  wrongAnswers: [],
  completedQuiz: false,
  previousAttemps: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_QUIZ_DONE:
      return {
        ...state,
        questions: action.payload.data,
        time: action.payload.time
      }
    case SUBMIT_QUIZ_RETURN:
      return {
        ...state,
        answers: action.payload.answers,
        selectedAnswersIdArray: action.payload.selectedAnswersIdArray,
        rightAnswers: action.payload.rightAnswers,
        wrongAnswers: action.payload.wrongAnswers,
        completedQuiz: true
      }
    case SHOW_EXPLANATION:
      return {
        ...state,
        completedQuiz: false,
      }
    case GET_PREVIOUS_ATTEMPS_RETURN:
      return {
        ...state,
        previousAttemps: action.payload.data
      }
    default:
      return state;
  }
}
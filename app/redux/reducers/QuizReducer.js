import { SET_QUIZ_DONE } from '../actions/types'
const initialState = {
  questions: null,
  time: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_QUIZ_DONE:
      return {
        ...state,
        questions: action.questions,
        time: action.time
      }
    default:
      return state;
  }
}
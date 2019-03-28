import { SET_QUIZ_DONE } from '../actions/types'
const initialState = {
  questions: null,
  time: 0,
  timeString: "15:00"
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_QUIZ_DONE:
      return {
        ...state,
        questions: action.payload.data,
        time: action.payload.time
      }
    default:
      return state;
  }
}
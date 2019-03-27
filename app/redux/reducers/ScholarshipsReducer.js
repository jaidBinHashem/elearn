import { GET_SCHOLARSHIPS_RETURN } from '../actions/types'
import { Alert } from 'react-native';
const initialState = {
  scholarships: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SCHOLARSHIPS_RETURN:
      return {
        ...state,
        scholarships: action.payload
      }
    default:
      return state;
  }
}
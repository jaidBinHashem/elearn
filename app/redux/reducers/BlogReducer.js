import { GET_BLOGS_RETURN } from '../actions/types'
const initialState = {
  newsAndUpdates: [],
  tipsAndTricks : []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BLOGS_RETURN:
      return {
        ...state,
        newsAndUpdates: action.payload
        // tipsAndTricks: action.payload.tips_and_tricks,
      }
    default:
      return state;
  }
}
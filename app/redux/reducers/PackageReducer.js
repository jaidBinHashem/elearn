import { GET_PACKAGES_RETURN, PROCEED_PACKAGES } from '../actions/types'
const initialState = {
  packages: [],
  selectedPackages: [],
  totalPrice: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PACKAGES_RETURN:
      return {
        ...state,
        packages: action.payload
      }
    case PROCEED_PACKAGES:
      return {
        ...state,
        selectedPackages: action.payload.selectedPackages,
        totalPrice: action.payload.totalPrice
      }
    default:
      return state;
  }
}
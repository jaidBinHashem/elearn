import { GET_PACKAGES_RETURN, PROCEED_PACKAGES, SUBMIT_BUY_PKG_RETURN } from '../actions/types'
const initialState = {
  packages: [],
  selectedPackages: [],
  totalPrice: 0,
  paymentHTML: null
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
    case SUBMIT_BUY_PKG_RETURN:
      return {
        ...state,
        paymentHTML: action.payload
      }
    default:
      return state;
  }
}
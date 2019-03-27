import { SIGN_OUT_COMPLETE, MAKE_LOGIN_REQUEST_SUCCESS, MAKE_LOGIN_REQUEST_FAILED, REGISTRATION_SUCCESS, REGISTRATION_FAILED, CHECK_AUTH_RETURN, SIGN_UP_RETURN, SUBMIT_STUDY_DETAILS_RETURN, SUBMIT_COURSES_RETURN, DUBLICATE_NUMBER_EMAIL } from '../actions/types'

const initialState = {
  isLoged: false,
  numberVerified: false,
  emailVerified: false,
  name: null,
  email: null,
  number: null,
  studyLevel: null,
  institution: null,
  courses: [],
  error: false,
  errorMessage: null,
  registrationSuccess: false,
  registrationSuccessMessage: null,
  loginFailed: false,
  loginFailedMessage: null,
  code: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHECK_AUTH_RETURN:
      return {
        ...state,
        isLoged: action.payload
      }
    case SIGN_UP_RETURN:
      return {
        ...state,
        numberVerified: true,
        emailVerified: true,
        name: action.payload.name,
        email: action.payload.email,
        number: action.payload.number,
        code: action.payload.code
      }
    case DUBLICATE_NUMBER_EMAIL:
      return {
        ...state,
        numberVerified: false,
        emailVerified: false,
        error: action.payload.error,
        errorMessage: action.payload.errorMessage
      }
    case SUBMIT_STUDY_DETAILS_RETURN:
      return {
        ...state,
        studyLevel: action.payload.studyLevel,
        institution: action.payload.institution
      }
    case SUBMIT_COURSES_RETURN:
      return {
        ...state,
        courses: action.payload,
      }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationSuccess: true,
        registrationSuccessMessage: action.payload
      }
    case REGISTRATION_FAILED:
      return {
        ...state,
        registrationFailed: true,
        registrationFailedMessage: action.payload
      }
    case MAKE_LOGIN_REQUEST_FAILED:
      return {
        ...state,
        loginFailed: true,
        loginFailedMessage: action.payload
      }
    case MAKE_LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isLoged: true,
        loginFailed: false,
        loginFailedMessage: null
      }
    case SIGN_OUT_COMPLETE:
      return {
        ...state,
        isLoged: false,
        numberVerified: false,
        emailVerified: false,
        name: null,
        email: null,
        number: null,
        studyLevel: null,
        institution: null,
        courses: [],
        error: false,
        errorMessage: null,
        registrationSuccess: false,
        registrationSuccessMessage: null,
        loginFailed: false,
        loginFailedMessage: null,
        code: null
      }
    default:
      return state;
  }
}
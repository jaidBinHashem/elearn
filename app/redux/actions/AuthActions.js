import { RESET_AUTH_REDUCER, RESET_AUTH_ERROR, MAKE_LOGIN_REQUEST, CHECK_AUTH, SIGN_UP, SUBMIT_STUDY_DETAILS, SUBMIT_COURSES, REGISTER_USER } from "./types";

export const checkAuth = () => {
  return {
    type: CHECK_AUTH,
  };
};

export const resetErrors = () => {
  return {
    type: RESET_AUTH_ERROR,
  };
};

export const makeLoginRequest = (code, number) => {
  return {
    type: MAKE_LOGIN_REQUEST,
    payload: {
      code: code,
      number: number
    }
  };
};

export const signUp = (code, email, name) => {
  return {
    type: SIGN_UP,
    payload: {
      code: code,
      name: name,
      email: email,
    }
  }
}

export const submitStudyDetails = (studyLevel, institution) => {
  return {
    type: SUBMIT_STUDY_DETAILS,
    payload: {
      studyLevel: studyLevel,
      institution: institution
    }
  }
}

export const submitCourses = (courses) => {
  return {
    type: SUBMIT_COURSES,
    payload: {
      courses: courses,
    }
  }
}

export const registerUser = (args) => {
  return {
    type: REGISTER_USER,
    payload: {
      args : args
    }
  }
}

export const resetAuthReducer = () => {
  return {
    type: RESET_AUTH_REDUCER,
  }
}

import AsyncStorage from '@react-native-community/async-storage';
import { put, call } from "redux-saga/effects";
import { RESET_AUTH_ERROR, GET_USER, SIGN_OUT_COMPLETE, MAKE_LOGIN_REQUEST_FAILED, MAKE_LOGIN_REQUEST_SUCCESS, REGISTRATION_SUCCESS, REGISTRATION_FAILED, CHECK_AUTH_RETURN, SIGN_UP_RETURN, SUBMIT_STUDY_DETAILS_RETURN, SUBMIT_COURSES_RETURN, DUBLICATE_NUMBER_EMAIL } from '../actions/types'
import { REGISTRATION_FAILED_MESSAGE, LOGIN_FAILED } from '../../constant/ErrorMessages'
import { USER_TOKEN, USER } from '../../constant/keys'
import { postService } from '../../network'

const retrieveUserToken = async () => {
    try {
        const token = await AsyncStorage.getItem(USER_TOKEN);
        const user = await AsyncStorage.getItem(USER);
        if (token !== null && user !== null) {
            return {
                token: token,
                user: JSON.parse(user)
            };
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const signUpUser = async (payload) => {
    try {
        let request = {
            endPoint: 'register/validate-user',
            showLoader: true,
            params: {
                code: payload.code,
                email: payload.email
            }
        }
        return (await postService(request));
    }
    catch (err) {
        console.log(err, "saga err signUpUser");
    }
}

const registerUserDetails = async (payload) => {
    try {
        let request = {
            endPoint: 'register',
            showLoader: true,
            params: {
                name: payload.authData.name,
                email: payload.authData.email,
                phone: payload.authData.number,
                study_level_id: payload.authData.studyLevel.id,
                institution_id: payload.authData.institution.id,
                code: payload.authData.code,
                categories: payload.courses,
                referral_code: payload.referralCode
            }
        }
        return (await postService(request));
    }
    catch (err) {
        console.log(err, "saga err registerUserDetails");
    }
}

const getToken = async (payload) => {
    try {
        let request = {
            endPoint: 'login',
            showLoader: true,
            params: {
                code: payload.code,
                phone: payload.number,
            }
        }
        return (await postService(request));
    }
    catch (err) {
        console.log(err, "saga err getToken");
    }
}

const setToken = async (response) => {
    try {
        await AsyncStorage.setItem(USER_TOKEN, response.data.token);
        await AsyncStorage.setItem(USER, JSON.stringify(response.data.user))
    } catch (error) {
        console.log(error);
    }
};


export const isAuthenticated = function* (action) {
    let { token, user } = yield call(retrieveUserToken);
    yield put({ type: CHECK_AUTH_RETURN, payload: token ? true : false });
    user && (yield put({ type: GET_USER }));
};

export const makeLoginRequest = function* (action) {
    let response = yield call(getToken, action.payload);
    if (response) {
        !response.success && (yield put({ type: MAKE_LOGIN_REQUEST_FAILED, payload: LOGIN_FAILED }));
        response.success && (yield call(setToken, response), yield put({ type: GET_USER }));
        response.success && (yield put({ type: MAKE_LOGIN_REQUEST_SUCCESS, payload: response }));
    } else {
        console.log("login failed");
    }
};

export const makeSignUpRequest = function* (action) {
    let response = yield call(signUpUser, action.payload);
    if (response.success) {
        if (response.data.status) {
            yield put({
                type: SIGN_UP_RETURN,
                payload: {
                    name: action.payload.name,
                    email: action.payload.email,
                    number: response.data.phone,
                    code: action.payload.code
                }
            });
        } else if (!response.data.status) {
            yield put({
                type: DUBLICATE_NUMBER_EMAIL,
                payload: {
                    error: true,
                    errorMessage: Array.isArray(response.data.message) ? response.data.message[0] : response.data.message
                }
            });
            yield put({ type: RESET_AUTH_ERROR });
        }
    } else {
        yield put({
            type: DUBLICATE_NUMBER_EMAIL,
            payload: {
                error: true,
                errorMessage: 'Some thing went wrong, please try again later',
            }
        });
        yield put({ type: RESET_AUTH_ERROR });
    }
}

export const saveStudyDetails = function* (action) {
    yield put({ type: SUBMIT_STUDY_DETAILS_RETURN, payload: action.payload });
};

export const saveCourses = function* (action) {
    yield put({ type: SUBMIT_COURSES_RETURN, payload: action.payload.courses });
};

export const registerUser = function* (action) {
    let response = yield call(registerUserDetails, action.payload);
    !response.success && (yield put({ type: REGISTRATION_FAILED, payload: response.data.referral_code ? 'Referral code isn\'t valid, you can register without applying referral code.' : REGISTRATION_FAILED_MESSAGE }));
    !response.success && (yield put({ type: RESET_AUTH_ERROR }));
    response.success && (yield put({ type: REGISTRATION_SUCCESS, payload: response.data.message }));
    response.success && (yield call(setToken, response));
};

export const signOut = function* (action) {
    yield AsyncStorage.removeItem('USER');
    yield AsyncStorage.removeItem('USER_TOKEN');
    yield put({ type: SIGN_OUT_COMPLETE });
};
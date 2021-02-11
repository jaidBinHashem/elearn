import AsyncStorage from '@react-native-community/async-storage';

import { BASE_URL, TEMP_URL } from './URL'
import { ERROR_CODE, ERROR_BODY, ERROR_CODE_VALUE, BAD_REQUEST_ERROR, OTHER_ERROR_CODE, SERVER_ERROR_CODE_VALUE } from '../constant/ErrorStatusCode';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';


const checkStatus = (response) => {
    // console.log(response, "all res");
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    else if (response.status >= 400 && response.status < 500) {
        let errorObject = {
            ERROR_CODE: ERROR_CODE_VALUE,
            ERROR_BODY: response
        }
        throw errorObject;
    } else {
        let errorObject = {
            ERROR_CODE: SERVER_ERROR_CODE_VALUE,
            ERROR_BODY: response
        }
        throw errorObject;
    }
}


export const getService = async (request) => {
    // console.log(request, "get request");
    try {
        request.showLoader && loaderHandler.showLoader("Loading");

        let requestHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (request.authenticate) {
            let accessToken = await AsyncStorage.getItem("USER_TOKEN");
            requestHeaders.authorization = 'Bearer ' + accessToken;
        }
        let response = await fetch(!request.baseUrl ? BASE_URL + request.endPoint : request.baseUrl, {
            method: 'GET',
            headers: requestHeaders,
        });
        response = await checkStatus(response).json();
        // console.log(response, "get success response");
        request.showLoader && loaderHandler.hideLoader();
        return { success: true, data: response };
    }
    catch (err) {
        response = await err.ERROR_BODY.json();
        // console.log(response, "JSON Error in get service");
        request.showLoader && loaderHandler.hideLoader();
        return { success: false, data: response, errorCode: err.ERROR_BODY.status }
    }
}


export const postService = async (request) => {
    // console.log(request, "post request");
    try {
        request.showLoader && loaderHandler.showLoader("Loading");
        
        let requestHeaders = {
            'Content-Type': request.contentType ? request.contentType : 'application/json',
            'Accept': 'application/json'
        };
        if (request.authenticate) {
            let accessToken = await AsyncStorage.getItem("USER_TOKEN");
            requestHeaders.authorization = 'Bearer ' + accessToken;
        }
        let response = await fetch(!request.temp ? BASE_URL + request.endPoint : request.baseUrl, {
            method: 'POST',
            headers: requestHeaders,
            body: request.contentType ? request.params : JSON.stringify(request.params)
        });
        response = await checkStatus(response).json();
        // console.log(response, "post success response");
        request.showLoader && request.endPoint !== "register" && loaderHandler.hideLoader();
        return { success: true, data: response };
    }
    catch (err) {
        response = await err.ERROR_BODY.json();
        // console.log(response, "JSON Error in post service");
        request.showLoader && loaderHandler.hideLoader();
        return { success: false, data: response, errorCode: err.ERROR_BODY.status }
    }
}


export const deleteService = async (request) => {
    // console.log(request, "delete request");
    try {
        request.showLoader && loaderHandler.showLoader("Loading");
        
        let requestHeaders = {
            'Content-Type': request.contentType ? request.contentType : 'application/json',
            'Accept': 'application/json'
        };
        if (request.authenticate) {
            let accessToken = await AsyncStorage.getItem("USER_TOKEN");
            requestHeaders.authorization = 'Bearer ' + accessToken;
        }
        let response = await fetch(!request.temp ? BASE_URL + request.endPoint : request.baseUrl, {
            method: 'DELETE',
            headers: requestHeaders,
        });
        response = await checkStatus(response).json();
        // console.log(response, "post success response");
        request.showLoader && loaderHandler.hideLoader();
        return { success: true, data: response };
    }
    catch (err) {
        response = await err.ERROR_BODY.json();
        // console.log(response, "JSON Error in post service");
        request.showLoader && loaderHandler.hideLoader();
        return { success: false, data: response, errorCode: err.ERROR_BODY.status }
    }
}
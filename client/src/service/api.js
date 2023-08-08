import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

// Base URL for API requests
const API_URL = 'http://localhost:8000';

// Create an instance of Axios with custom configurations
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
});

// Axios Request Interceptor
axiosInstance.interceptors.request.use(
    function(config) {
        // Modify the request configuration based on the TYPE specified in the service URL
        if (config.TYPE.params) {
            config.params = config.TYPE.params;
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

// Axios Response Interceptor
axiosInstance.interceptors.response.use(
    function(response) {
        // Stop global loader here
        // Process the response and return the result
        return processResponse(response);
    },
    function(error) {
        // Stop global loader here
        // Process the error and return the result
        return Promise.reject(ProcessError(error));
    }
);

// Function to process the Axios response
const processResponse = (response) => {
    // Check if the response status is 200 (successful response)
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        // Return the details of the failed response
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        };
    }
};

// Function to process Axios error
const ProcessError = async (error) => {
    if (error.response) {
        // Request made and server responded with a status code 
        // that falls out of the range of 2xx
        // Check for specific status codes like 403 (Forbidden)
        if (error.response?.status === 403) {
            // Perform actions like refreshing tokens or clearing sessions
            sessionStorage.clear();
            // Additional code to handle token refresh
        } else {
            // Handle other response errors
            console.log("ERROR IN RESPONSE: ", error.toJSON());
            return {
                isError: true,
                msg: API_NOTIFICATION_MESSAGES.responseFailure,
                code: error.response.status
            };
        }
    } else if (error.request) { 
        // The request was made but no response was received
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        };
    } else { 
        // Something happened in setting up the request that triggered an Error
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        };
    }
};

// API Object to store API functions
const API = {};

// Iterate over SERVICE_URLS and create API functions for each service URL
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? '' : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };

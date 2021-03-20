import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGGED_IN,
    NOT_LOGGED_IN,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    API_URL,
} from "../../../constants/ActionTypes";
import axios from 'axios';

export const postLoginUserRequest = () => ({
    type: LOGIN_USER_REQUEST
});

export const postLoginUserFailed = error => ({
    type: LOGIN_USER_FAILED,
    payload: error
});

export const postLoginUserSuccess = (data) => ({
    type: LOGIN_USER_SUCCESS,
    payload: data,
});

export const postRegisterUserRequest = () => ({
    type: REGISTER_USER_REQUEST
});

export const postRegisterUserFailed = error => ({
    type: REGISTER_USER_FAILED,
    payload: error
});

export const postRegisterUserSuccess = data => ({
    type: REGISTER_USER_SUCCESS,
    payload: data
});

export const postLoginUser = (user) => {

    const data = {
        "email": `${user.email}`,
        "password": `${user.password}`
    };

    console.log("data:", data);

    return dispatch => {
        dispatch(postLoginUserRequest());
        axios.post(`${API_URL}/users/login`, data).then((response) => {
            dispatch(postLoginUserSuccess(response.data));
            localStorage.setItem("access_token", response.data.token);
            localStorage.setItem("user_email", response.data.user.email);
            localStorage.setItem("user_name", response.data.user.name);
            localStorage.setItem("user_surName", response.data.user.surName);
        }).catch((e) => {
            dispatch(postLoginUserFailed(e))
        })
    }
};

export const postRegisterUser = (user, plan) => {

    const data = {
        "name": `${user.name}`,
        "surName": `${user.surName}`,
        "email": `${user.email}`,
        "password": `${user.password}`,
        "plan": [plan]
    };

    return dispatch => {
        dispatch(postRegisterUserRequest());
        axios.post(`${API_URL}/users/register`, data).then((response) => {
            dispatch(postRegisterUserSuccess(response.data));
        }).catch((e) => {
            dispatch(postRegisterUserFailed(e))
        })
    }
};

export const isLoggedIn = () => {
    const token = localStorage.getItem('access_token');

    return (dispatch) => {
        if (token) {
            dispatch({
                type: LOGGED_IN,
                payload: true
            });
        } else {
            dispatch({
                type: NOT_LOGGED_IN,
                payload: false
            });
        }
    };
};

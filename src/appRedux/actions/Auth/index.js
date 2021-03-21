import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGGED_IN,
  NOT_LOGGED_IN,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  API_URL,
} from "../../../constants/ActionTypes";
import axios from 'axios';

export const postLoginUserRequest = () => ({
  type: LOGIN_USER_REQUEST
});

export const postLoginUserSuccess = (data) => ({
  type: LOGIN_USER_SUCCESS,
  payload: data,
});

export const postLoginUserFailed = error => ({
  type: LOGIN_USER_FAILED,
  payload: error
});

export const postRegisterUserRequest = () => ({
  type: REGISTER_USER_REQUEST
});

export const postRegisterUserSuccess = data => ({
  type: REGISTER_USER_SUCCESS,
  payload: data
});

export const postRegisterUserFailed = error => ({
  type: REGISTER_USER_FAILED,
  payload: error
});

export const postLogoutUserRequest = () => ({
  type: LOGOUT_USER_REQUEST
});

export const postLogoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS
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
      localStorage.setItem("user_id", response.data.user._id);
      localStorage.setItem("access_token", response.data.token);
    }).catch((e) => {
      dispatch(postLoginUserFailed(e))
    })
  }
};

export const postRegisterUser = (user) => {

  return dispatch => {
    dispatch(postRegisterUserRequest());
    axios.post(`${API_URL}/users/register`, user).then((response) => {
      dispatch(postRegisterUserSuccess(response.data.data));
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

export const postLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_id');

  return (dispatch) => {
    dispatch(postLogoutUserSuccess());
  };
};

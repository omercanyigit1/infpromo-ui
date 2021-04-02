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
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILED,
  FETCH_RESET_PASSWORD_REQUEST,
  FETCH_RESET_PASSWORD_SUCCESS,
  FETCH_RESET_PASSWORD_FAILED,
  POST_RESET_PASSWORD_REQUEST,
  POST_RESET_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_FAILED,
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

export const postForgetPasswordRequest = () => ({
  type: FORGET_PASSWORD_REQUEST
});

export const postForgetPasswordSuccess = (data) => ({
  type: FORGET_PASSWORD_SUCCESS,
  payload: data,
});

export const postForgetPasswordFailed = error => ({
  type: FORGET_PASSWORD_FAILED,
  payload: error
});

export const postResetPasswordRequest = () => ({
  type: POST_RESET_PASSWORD_REQUEST
});

export const postResetPasswordSuccess = (data) => ({
  type: POST_RESET_PASSWORD_SUCCESS,
  payload: data,
});

export const postResetPasswordFailed = error => ({
  type: POST_RESET_PASSWORD_FAILED,
  payload: error
});

export const getResetPasswordRequest = () => ({
  type: FETCH_RESET_PASSWORD_REQUEST
});

export const getResetPasswordSuccess = (data) => ({
  type: FETCH_RESET_PASSWORD_SUCCESS,
  payload: data,
});

export const getResetPasswordFailed = error => ({
  type: FETCH_RESET_PASSWORD_FAILED,
  payload: error
});


export const postLoginUser = (user) => {

  const data = {
    "email": `${user.email}`,
    "password": `${user.password}`
  };

  return dispatch => {
    dispatch(postLoginUserRequest());
    axios.post(`${API_URL}/users/login`, data).then((response) => {
      dispatch(postLoginUserSuccess(response.data));
      localStorage.setItem("user_id", response.data.user._id);
      localStorage.setItem("access_token", response.data.token);
    }).catch((e) => {
      dispatch(postLoginUserFailed(e.response.data));
    })
  }
};

export const postRegisterUser = (user) => {

  return dispatch => {
    dispatch(postRegisterUserRequest());
    axios.post(`${API_URL}/users/register`, user).then((response) => {
      dispatch(postRegisterUserSuccess(response.data.data));
    }).catch((e) => {
      dispatch(postRegisterUserFailed(e.response.data))
    })
  }
};

export const postForgetPassword = (user) => {

  return dispatch => {
    dispatch(postForgetPasswordRequest());
    axios.post(`${API_URL}/users/forget-password`, user).then((response) => {
      dispatch(postForgetPasswordSuccess(response.data));
    }).catch((e) => {
      dispatch(postForgetPasswordFailed(e.response.data));
    })
  }
};

export const getResetPassword = (tokenId) => {

  return dispatch => {
    dispatch(getResetPasswordRequest());
    axios.get(`${API_URL}/users/reset-password/${tokenId}`).then((response) => {
      dispatch(getResetPasswordSuccess(response.data));
    }).catch((e) => {
      dispatch(getResetPasswordFailed(e.response.data));
    })
  }
};

export const postResetPassword = (user, tokenId) => {

  return dispatch => {
    dispatch(postResetPasswordRequest());
    axios.post(`${API_URL}/users/reset-password/${tokenId}`, user).then((response) => {
      dispatch(postResetPasswordSuccess(response.data));
    }).catch((e) => {
      dispatch(postResetPasswordFailed(e.response.data));
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

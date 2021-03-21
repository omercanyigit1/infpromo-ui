import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  POST_PAYMENT_REQUEST,
  POST_PAYMENT_SUCCESS,
  POST_PAYMENT_FAILED,
  API_URL,
} from "../../../constants/ActionTypes";
import axios from 'axios';

const _retrieveData = async () => {
  try {
    const value = await localStorage.getItem('access_token');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

const _retrieveDataId = async () => {
  try {
    const value = await localStorage.getItem('user_id');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

export const getUserRequest = () => ({
  type: FETCH_USER_REQUEST
});

export const getUserFailed = error => ({
  type: FETCH_USER_FAILED,
  payload: error
});

export const getUserSuccess = (data) => ({
  type: FETCH_USER_SUCCESS,
  payload: data,
});

export const postPaymentRequest = () => ({
  type: POST_PAYMENT_REQUEST
});

export const postPaymentFailed = error => ({
  type: POST_PAYMENT_FAILED,
  payload: error
});

export const postPaymentSuccess = (data) => ({
  type: POST_PAYMENT_SUCCESS,
  payload: data,
});

export const getUser = () => {

  return dispatch => {
    _retrieveDataId().then((id) => {

      _retrieveData().then((token) => {

        const axiosConfig = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json"
          }
        };

        dispatch(getUserRequest());

        axios.get(`${API_URL}/users/${id}`, axiosConfig).then((response) => {
          dispatch(getUserSuccess(response.data.data));
        }).catch((error) => {
          getUserFailed(error.response)
        });
      });
    })
  }
};

export const postPayment = (data) => {

  return dispatch => {

    _retrieveDataId().then((id) => {
      _retrieveData().then((token) => {

        const axiosConfig = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Access-Control-Allow-Origin': '*/*'
          }
        };

        dispatch(postPaymentRequest());

        axios.post(`${API_URL}/credit/user/${id}`,data, axiosConfig).then((response) => {
          dispatch(postPaymentSuccess(response.data.data));
          //console.log(response.data.data);
        }).catch((error) => {
          dispatch(postPaymentFailed(error.response));
        });
      });
    });
  };
};


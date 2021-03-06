import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  POST_PAYMENT_REQUEST,
  POST_PAYMENT_SUCCESS,
  POST_PAYMENT_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  POST_TICKET_REQUEST,
  POST_TICKET_SUCCESS,
  POST_TICKET_FAILED,
  API_URL, SELECTED_PRICE_SUCCESS,
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

export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST
});

export const updateUserFailed = error => ({
  type: UPDATE_USER_FAILED,
  payload: error
});

export const updateUserSuccess = (data) => ({
  type: UPDATE_USER_SUCCESS,
  payload: data,
});

export const postTicketRequest = () => ({
  type: POST_TICKET_REQUEST
});

export const postTicketFailed = error => ({
  type: POST_TICKET_FAILED,
  payload: error
});

export const postTicketSuccess = (data) => ({
  type: POST_TICKET_SUCCESS,
  payload: data,
});

export const postSelectedPriceSuccess = (data) => ({
  type: SELECTED_PRICE_SUCCESS,
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
          getUserFailed(error.response.data)
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
        }).catch((error) => {
          dispatch(postPaymentFailed(error.response.data));
        });
      });
    });
  };
};

export const updateUser = (data) => {

  return dispatch => {

    _retrieveDataId().then((id) => {
      _retrieveData().then((token) => {

        const axiosConfig = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Access-Control-Allow-Origin': '*/*',
            'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS, DELETE, PATCH'
          }
        };

        dispatch(updateUserRequest());

        axios.patch(`${API_URL}/users/${id}`,data, axiosConfig).then((response) => {
          dispatch(updateUserSuccess(response.data));
        }).catch((error) => {
          dispatch(updateUserFailed(error.response.data));
        });
      });
    });
  };
};

export const postTicket = (data) => {

  return dispatch => {

    _retrieveDataId().then((id) => {
      _retrieveData().then((token) => {

        const axiosConfig = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
          }
        };

        dispatch(postTicketRequest());

        axios.post(`${API_URL}/users/ticket`,data, axiosConfig).then((response) => {
          dispatch(postTicketSuccess(response.data.data));
        }).catch((e) => {
          dispatch(postTicketFailed(e.response.data));
        });
      });
    });
  };
};

export const postSelectedPrice = (data) => {
  return (dispatch) => {
    dispatch(postSelectedPriceSuccess(data));
  };
};


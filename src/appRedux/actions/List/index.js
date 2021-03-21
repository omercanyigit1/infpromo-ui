import {
  SEARCH_ADVANCED_REQUEST,
  SEARCH_ADVANCED_SUCCESS,
  SEARCH_ADVANCED_FAILED,
  SEARCH_GENERATE_PDF_REQUEST,
  SEARCH_GENERATE_PDF_SUCCESS,
  SEARCH_GENERATE_PDF_FAILED,
  API_URL,
} from "../../../constants/ActionTypes";
import axios from 'axios';

export const postSearchAdvancedRequest = () => ({
  type: SEARCH_ADVANCED_REQUEST
});

export const postSearchAdvancedFailed = error => ({
  type: SEARCH_ADVANCED_FAILED,
  payload: error
});

export const postSearchAdvancedSuccess = (data) => ({
  type: SEARCH_ADVANCED_SUCCESS,
  payload: data,
});

export const postGeneratePdfRequest = () => ({
  type: SEARCH_GENERATE_PDF_REQUEST
});

export const postGeneratePdfFailed = error => ({
  type: SEARCH_GENERATE_PDF_FAILED,
  payload: error
});

export const postGeneratePdfSuccess = (data) => ({
  type: SEARCH_GENERATE_PDF_SUCCESS,
  payload: data,
});

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

export const postSearchAdvanced = (data, network) => {

  return dispatch => {

    _retrieveDataId().then((id) => {
      _retrieveData().then((token) => {

        const axiosConfig = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json"
          }
        };

        dispatch(postSearchAdvancedRequest());

        axios.post(`${API_URL}/${network}/search/${id}`, data, axiosConfig).then((response) => {
          dispatch(postSearchAdvancedSuccess(response.data.data));
          //console.log(response.data.data);
        }).catch((error) => {
          dispatch(postSearchAdvancedFailed(error.response));
        });
      });
    });
  };
};

export const postGeneratePdf = (userId, network) => {

  return dispatch => {
    _retrieveDataId().then((id) => {
      _retrieveData().then((token) => {

        const axiosConfig = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json"
          }
        };

        dispatch(postGeneratePdfRequest());

        axios.post(`${API_URL}/${network}/profile/${userId}/report/pdf/${id}`, {}, axiosConfig).then((response) => {
          dispatch(postGeneratePdfSuccess(response.data.data));
        }).catch((error) => {
          dispatch(postGeneratePdfFailed(error.response));
        });
      });
    });
  }
};

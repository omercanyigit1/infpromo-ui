import {
  FETCH_USER_FAILED,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LOGGED_IN,
  NOT_LOGGED_IN,
  POST_PAYMENT_REQUEST,
  POST_PAYMENT_SUCCESS,
  POST_PAYMENT_FAILED,
} from "../../../constants/ActionTypes";

const initialState = {
  isLogged: false,
  loading: false,
  error: null,
  message: '',
  user: {},
  isPayment: false,
  credit: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isLogged: false,
        error: null
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLogged: true,
        user: action.payload.userPublic,
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        loading: false,
        isLogged: false,
        error: 'Invalid User',
        user: []
      };
    case POST_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        credit: null
      };
    case POST_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isPayment: action.payload.isPayment,
        credit: action.payload.credit
      };
    case POST_PAYMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: 'Invalid User',
        isPayment: false,
      };
    case LOGGED_IN:
      return {
        ...state,
        isLogged: true,
      };
    case NOT_LOGGED_IN:
      return {
        ...state,
        isLogged: false,
      };
    default:
      return state;
  }
}

import {
  FETCH_USER_FAILED,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LOGGED_IN,
  NOT_LOGGED_IN,
  POST_TICKET_REQUEST,
  POST_TICKET_SUCCESS,
  POST_TICKET_FAILED,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from "../../../constants/ActionTypes";
import _ from 'lodash';

const initialState = {
  isLogged: false,
  loading: false,
  error: null,
  message: '',
  user: {},
  isPayment: false,
  creditLoaded: null,
  isTicketSend: false
};

const UserReducer = (state = initialState, action) => {
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
        user: {}
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_USER_SUCCESS:
      const newUser = _.extend({}, state.user, action.payload.data.userPublic);

      return {
        ...state,
        loading: false,
        user: newUser
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: 'Kullanıcı Güncellenemedi...',
      };
    case POST_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        isTicketSend: false
      };
    case POST_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        isTicketSend: true
      };
    case POST_TICKET_FAILED:
      return {
        ...state,
        loading: false,
        error: 'Invalid User',
        isTicketSend: false
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

export default UserReducer;

import {
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
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
  LOGGED_IN,
  NOT_LOGGED_IN,
} from "../../../constants/ActionTypes";

const initialState = {
  user: {},
  token: '',
  user_id: '',
  isLogged: false,
  loading: false,
  error: null,
  message: '',
  isCreated: false,
  isResetPassword: false,
  isRecoveryPassword: false
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isLogged: false,
        error: null
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLogged: true,
        user: action.payload.user,
        token: action.payload.token,
        user_id: action.payload._id
      };
    case LOGIN_USER_FAILED:
      return {
        ...state,
        loading: false,
        isLogged: false,
        error: action.payload.message,
        user: {}
      };
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isCreated: action.payload.isCreated
      };
    case REGISTER_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: 'Geçersiz Kullanıcı',
        user: {}
      };
    case FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isResetPassword: action.payload
      };
    case FORGET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case FETCH_RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case POST_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isRecoveryPassword: action.payload
      };
    case POST_RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLogged: false,
        token: null,
        user_id: null
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

export default AuthReducer;

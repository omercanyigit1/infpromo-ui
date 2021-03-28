import {
  SEARCH_ADVANCED_FAILED,
  SEARCH_ADVANCED_REQUEST,
  SEARCH_ADVANCED_SUCCESS,
  SEARCH_USERNAME_FAILED,
  SEARCH_USERNAME_REQUEST,
  SEARCH_USERNAME_SUCCESS,
  SEARCH_GENERATE_PDF_REQUEST,
  SEARCH_GENERATE_PDF_SUCCESS,
  SEARCH_GENERATE_PDF_FAILED,
  POST_PAGINATION_REQUEST,
  POST_PAGINATION_SUCCESS,
  POST_PAGINATION_FAILED,
  LOGGED_IN,
  NOT_LOGGED_IN,
} from "../../../constants/ActionTypes";
import data from './data.json';

const initialState = {
  loading: false,
  error: null,
  searchList: [],
  directs: [],
  total: 0,
  reportId: null,
  reportData: null,
  reportDataLoading: false,
  credit: null,
  showSorting: false,
};

const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ADVANCED_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        credit: null,
        showSorting: false,
      };
    case SEARCH_ADVANCED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        searchList: data.lookalikes,
        credit: action.payload.credit,
        total: action.payload.bodyNew.total,
        showSorting: true,
      };
    case SEARCH_ADVANCED_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.data.message,
        showSorting: false
      };
    case POST_PAGINATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        credit: null,
      };
    case POST_PAGINATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        searchList: data.lookalikes,
        credit: action.payload.credit,
        total: action.payload.bodyNew.total,
      };
    case POST_PAGINATION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.data.message,
      };
    case SEARCH_USERNAME_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        credit: null,
        showSorting: false
      };
    case SEARCH_USERNAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        directs: action.payload.bodyNew.directs,
        credit: action.payload.credit,
        total: action.payload.bodyNew.total,
        showSorting: true
      };
    case SEARCH_USERNAME_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.data.message,
        showSorting: false
      };
    case SEARCH_GENERATE_PDF_REQUEST:
      return {
        ...state,
        error: null,
        credit: null,
        reportDataLoading: true,
        reportId: null
      };
    case SEARCH_GENERATE_PDF_SUCCESS:
      return {
        ...state,
        reportDataLoading: false,
        error: null,
        reportId: action.payload.pdfBody.profile,
        reportData: action.payload.pdfBody.profile,
        credit: action.payload.credit
      };
    case SEARCH_GENERATE_PDF_FAILED:
      return {
        ...state,
        loading: false,
        isLogged: false,
        error: action.payload.data.message,
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

export default ListReducer;

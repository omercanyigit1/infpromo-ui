import {
  SEARCH_ADVANCED_FAILED,
  SEARCH_ADVANCED_REQUEST,
  SEARCH_ADVANCED_SUCCESS,
  SEARCH_GENERATE_PDF_REQUEST,
  SEARCH_GENERATE_PDF_SUCCESS,
  SEARCH_GENERATE_PDF_FAILED,
  LOGGED_IN,
  NOT_LOGGED_IN,
} from "../../../constants/ActionTypes";

const initialState = {
  loading: false,
  error: null,
  searchList: [],
  total: 0,
  pdfUrl: '',
  credit: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ADVANCED_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        credit: null
      };
    case SEARCH_ADVANCED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        searchList: action.payload.bodyNew.lookalikes,
        credit: action.payload.credit,
        total: action.payload.total
      };
    case SEARCH_ADVANCED_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.data.message,
      };
    case SEARCH_GENERATE_PDF_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        credit: null
      };
    case SEARCH_GENERATE_PDF_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        pdfUrl: action.payload.pdfBody.url,
        credit: action.payload.credit,
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

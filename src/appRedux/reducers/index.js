import {combineReducers} from "redux";
import Settings from "./Settings";
import Common from "./Common";
import {connectRouter} from 'connected-react-router'
import authReducer from "./Auth/index";

export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  common: Common,
  auth: authReducer
});

import {combineReducers} from "redux";
import Settings from "./Settings";
import Common from "./Common";
import {connectRouter} from 'connected-react-router'
import AuthReducer from "./Auth";
import ListReducer from "./List";
import UserReducer from './User';

const RootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  common: Common,
  auth: AuthReducer,
  list: ListReducer,
  user: UserReducer
});

export default RootReducer;

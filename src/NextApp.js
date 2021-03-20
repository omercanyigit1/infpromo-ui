import React, {useEffect} from "react";
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from "react-router-dom";
import "assets/vendors/style";
import "styles/wieldy.less";
import {useDispatch, useSelector} from "react-redux";
import {isLoggedIn} from './appRedux/actions/';
import {connect} from 'react-redux';

import configureStore, {history} from './appRedux/store';
import App from "./containers/App/index";
import LandingApp from "./containers/LandingApp/index";
import WrapperApp from "./WrapperApp";

const store = configureStore(/ provide initial state if any /);


const NextApp = (props) => {

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <WrapperApp />
      </ConnectedRouter>
    </Provider>
  )
}

export default NextApp;

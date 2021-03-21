import React from "react";
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import "assets/vendors/style";
import "styles/wieldy.less";

import configureStore, {history} from './appRedux/store';
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

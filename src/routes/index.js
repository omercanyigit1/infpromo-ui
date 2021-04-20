import React from "react";
import {Route, Switch, HashRouter, BrowserRouter} from "react-router-dom";
import asyncComponent from "util/asyncComponent";
import {isLoggedIn} from "../appRedux/actions";
import {connect} from 'react-redux';

const App = ({match}) => {

  return (
    <div className="gx-main-content-wrapper">
      <BrowserRouter>
        <Switch>
          <Route path={`${match.url}search`} component={asyncComponent(() => import('./SamplePage'))}/>
          <Route path={`${match.url}credit`} component={asyncComponent(() => import('./CreditPage'))}/>
          <Route path={`${match.url}account`} component={asyncComponent(() => import('./AccountPage'))}/>
          <Route path={`${match.url}support`} component={asyncComponent(() => import('./SupportPage'))}/>
          <Route path={`${match.url}payment/error`} component={asyncComponent(() => import('./PaymentErrorPage'))}/>
          <Route path={`${match.url}payment/success`} component={asyncComponent(() => import('./PaymentSuccessPage'))}/>
          <Route path={`${match.url}detail/:network/:id`} component={asyncComponent(() => import('./DetailPage'))}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged
  }
}

export default connect(mapStateToProps, {isLoggedIn})(App);

import React from "react";
import {Route, Switch, HashRouter} from "react-router-dom";
import asyncComponent from "util/asyncComponent";
import {isLoggedIn} from "../appRedux/actions";
import {connect} from 'react-redux';

const App = ({match}) => {

  return (
    <div className="gx-main-content-wrapper">
      <HashRouter>
        <Switch>
          <Route path={`${match.url}search`} component={asyncComponent(() => import('./SamplePage'))}/>
          <Route path={`${match.url}credit`} component={asyncComponent(() => import('./CreditPage'))}/>
          <Route path={`${match.url}account`} component={asyncComponent(() => import('./AccountPage'))}/>
          <Route path={`${match.url}support`} component={asyncComponent(() => import('./SupportPage'))}/>
        </Switch>
      </HashRouter>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged
  }
}

export default connect(mapStateToProps, {isLoggedIn})(App);

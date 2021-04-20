import React, {useEffect} from "react";
import {isLoggedIn, postLogout} from "./appRedux/actions";
import {Route, Switch, HashRouter, useLocation, BrowserRouter} from "react-router-dom";
import App from "./containers/App";
import LandingApp from "./containers/LandingApp";
import {connect} from "react-redux";

const WrapperApp = (props) => {
  let location = useLocation();
  const token = localStorage.getItem('access_token');

  const {isLoggedIn, isLogged, history, postLogout} = props;

  useEffect(() => {
    isLoggedIn();

    if(isLogged === false) {
      if(location.hash === '#/search' || location.hash === '#/account' || location.hash === '#/credit' || location.hash === '#/support') {
        //history.push('#/');
        //history.go(0);
      }
    }

    if(isLogged === true) {
      if(location.hash === '#/login' || location.hash === '#/register' || location.hash === '#/forget-password') {
        history.push('#/search');
      }

      if(!token) {
        history.push('#/');
        history.go(0);
      }
    }

  }, [isLoggedIn, isLogged, history])

  if(isLogged) {
    return (
      <HashRouter>
        <Switch>
          <Route path={`/`} component={App} />
        </Switch>
      </HashRouter>
    )
  }

  if(!isLogged) {
    return (
      <HashRouter>
        <Switch>
          <Route path={`/`} component={LandingApp} />
        </Switch>
      </HashRouter>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    user: state.user.user,
    token: state.auth.token,
    isLogged: state.auth.isLogged
  }
};

export default connect(mapStateToProps, {isLoggedIn, postLogout})(WrapperApp);

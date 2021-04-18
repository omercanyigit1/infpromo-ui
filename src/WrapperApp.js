import React, {useEffect} from "react";
import {isLoggedIn} from "./appRedux/actions";
import {Route, Switch, HashRouter, useLocation} from "react-router-dom";
import App from "./containers/App";
import LandingApp from "./containers/LandingApp";
import {connect} from "react-redux";

const WrapperApp = (props) => {
  let location = useLocation();

  const {isLoggedIn, isLogged, history} = props;

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
    }

  }, [isLoggedIn, isLogged, history])

  if(isLogged) {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" component={App} />
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

export default connect(mapStateToProps, {isLoggedIn})(WrapperApp);

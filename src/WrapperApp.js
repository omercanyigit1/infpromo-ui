import React, {useEffect} from "react";
import {isLoggedIn} from "./appRedux/actions";
import {Route, Switch, useHistory} from "react-router-dom";
import App from "./containers/App";
import LandingApp from "./containers/LandingApp";
import {connect} from "react-redux";

const WrapperApp = (props) => {
  const {isLoggedIn, isLogged} = props;
  const history = useHistory();

  useEffect(() => {
    isLoggedIn();

    if(isLogged === false) {
      if(window.location.pathname === '/search' || window.location.pathname === '/account' || window.location.pathname === '/credit') {
        history.push('/');
        history.go(0);
      }
    }

    if(isLogged === true) {
      if(window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/forget-password') {
        history.push('/search');
      }
    }

  }, [isLoggedIn, isLogged, history])

  if(isLogged) {
    return (
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    )
  }

  if(!isLogged) {
    return (
      <Switch>
        <Route path={`/`} component={LandingApp} />
      </Switch>
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

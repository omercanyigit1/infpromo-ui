import React, {useEffect} from "react";
import {isLoggedIn} from "./appRedux/actions";
import {Route, Switch} from "react-router-dom";
import App from "./containers/App";
import LandingApp from "./containers/LandingApp";
import {connect} from "react-redux";

const tokenFirst = localStorage.getItem('access_token');

const WrapperApp = (props) => {
  const {isLoggedIn, token, isLogged, user} = props;

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn, isLogged])

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

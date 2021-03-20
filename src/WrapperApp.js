import React, {useEffect} from "react";
import {isLoggedIn} from "./appRedux/actions";
import {Route, Switch} from "react-router-dom";
import App from "./containers/App";
import LandingApp from "./containers/LandingApp";
import {connect} from "react-redux";

const tokenFirst = localStorage.getItem('access_token');

const WrapperApp = (props) => {
  const {token, isLogged} = props;

  useEffect(() => {
    console.log(token);
  }, [isLoggedIn, isLogged])

  if(token || tokenFirst) {
    return (
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    )
  }

  if(!token || !tokenFirst) {
    return (
      <Switch>
        <Route path={`/`} component={LandingApp}/>
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    user: state.auth.user,
    token: state.auth.token,
    isLogged: state.auth.isLogged
  }
};

export default connect(mapStateToProps, {isLoggedIn})(WrapperApp);

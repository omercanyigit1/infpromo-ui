import React, { Component, Suspense } from "react";
import Layout from "./components/Layout";
import {
  Route,
  Switch,
  withRouter,
  HashRouter,
  BrowserRouter
} from "react-router-dom";
import {isLoggedIn} from "../../appRedux/actions";
import {connect} from 'react-redux';

// Import Css
import "./assets/css/materialdesignicons.min.css";
import "./Apps.scss";

import "./assets/css/colors/default.css";

import routes from "./routes";
// Include Routes

function withLayout(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    render() {
      return (
        <Layout>
          <WrappedComponent></WrappedComponent>
        </Layout>
      );
    }
  };
}

class LandingApp extends Component {
  Loader = () => {
    return (
      <div id="preloader">
        <div id="status">
          <div className="spinner">
            <div className="double-bounce1" />
            <div className="double-bounce2" />
          </div>
        </div>
      </div>
    );
  };

  componentWillMount() {

  }

  render() {

    return (
      <React.Fragment>
        <HashRouter>
          <Suspense fallback={this.Loader()}>
            <Switch>
              {routes.map((route, idx) =>
                route.isWithoutLayout ? (
                  <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    key={idx}
                  />
                ) : (
                  <Route
                    path={route.path}
                    exact
                    component={withLayout(route.component)}
                    key={idx}
                  />
                )
              )}
            </Switch>
          </Suspense>
        </HashRouter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isLogged: state.auth.isLogged
  }
}

export default connect(mapStateToProps, {isLoggedIn})(withRouter(LandingApp));

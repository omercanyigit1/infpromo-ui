import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

//Import Images
import logodark from "./../../../../assets/images/infpromo-logo-black.png";

class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [],
      isOpen: false,
    };
    this.toggleLine = this.toggleLine.bind(this);
  }

  toggleLine() {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    return (
      <React.Fragment>
        <header id="topnav" className="defaultscroll sticky">
          <Container>
            <div>
              <Link className="logo" to="#">
                <img src={logodark} height="24" alt="" />
              </Link>
            </div>
            <div className={"mobile-buy-buttons"}>
              <div className="buy-button">
                <Link
                  to="/login"
                  className="btn btn-secondary"
                >
                  Giriş Yap
                </Link>
              </div>

              <div className="buy-button">
                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  Ücretsiz Dene!
                </Link>
              </div>
            </div>

          </Container>
        </header>
      </React.Fragment>
    );
  }
}

export default NavbarPage;

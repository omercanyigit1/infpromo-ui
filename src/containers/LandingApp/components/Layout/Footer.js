import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";

// import images
import americanEx from "../../assets/images/payments/american-ex.png";
import discover from "../../assets/images/payments/discover.png";
import masterCard from "../../assets/images/payments/master-card.png";
import paypal from "../../assets/images/payments/paypal.png";
import visa from "../../assets/images/payments/visa.png";
// import { FiChevronLeft } from "react-icons/fi";

//Import Images
import logolight from "./../../../../assets/images/infpromo-logo.png";
import logodark from "./../../../../assets/images/infpromo-logo-black.png";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <React.Fragment>
        <footer className={this.props.isLight ? "footer bg-light" : "footer footer-border"} style={{paddingBottom: 0, paddingTop: 50}}>
          <Container>
            <Row>
              <Col
                lg="4"
                xs="12"
                className="mb-0 mb-md-4 pb-0 pb-md-2"
                name="footercolumn">
                <Link to="#" className="logo-footer">
                  <img
                    src={this.props.isLight ? 'https://infpromo.com/images/logo-black.svg' : 'https://infpromo.com/images/logo-white.svg'}
                    height="30"
                    alt=""
                  />
                </Link>
                <p className={this.props.isLight ? "mt-4 text-muted" : "mt-4"}>
                  Esentepe, Yüzbaşı Kaya Aldogan Sk. Caddesi D:4 No:4, 34394 Şişli / İstanbul
                </p>
                <ul className="list-unstyled social-icon social mb-0 mt-4">
                  <li className="list-inline-item ml-1">
                    <a href={'https://www.instagram.com/infpromo/'} target="_blank" className="rounded">
                      <i>
                        <FeatherIcon
                          icon="instagram"
                          className="fea icon-sm fea-social"
                        />
                      </i>
                    </a>
                  </li>
                </ul>
              </Col>

              <Col
                lg="2"
                md="4"
                xs="12"
                className="mt-4 mt-sm-0 pt-2 pt-sm-0 d-xs-none d-md-block"
                name="footercolumn"
              />

              <Col
                lg="3"
                md="4"
                xs="12"
                className="mt-4 mt-sm-0 pt-2 pt-sm-0 d-xs-none d-md-block"
                name="footercolumn"
              />

              <Col
                lg="3"
                md="4"
                xs="12"
                className="mt-4 mt-sm-0 pt-2 pt-sm-0 text-md-right"
                name="footercolumn"
              >
                <h5
                  className={
                    this.props.isLight
                      ? "text-dark footer-head"
                      : "text-light footer-head"
                  }
                >
                  Bilgi için
                </h5>
                <p className="mt-4">
                  <a href="mailto:info@infpromo.com">
                    info@infpromo.com
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
        <footer className="footer footer-bar">
          <Container className="text-center">
            <Row className="align-items-center">
              <Col sm="6">
                <div className="text-sm-left">
                  <p className="mb-0">
                    © 2020-21 Infpromo {" "}
                  </p>
                </div>
              </Col>

              <Col sm="6" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                <ul className="list-unstyled text-sm-right mb-0">
                  <li className="list-inline-item mr-1">
                    <Link to="">
                      <img
                        src={masterCard}
                        className="avatar avatar-ex-sm"
                        title="Master Card"
                        alt=""
                      />
                    </Link>
                  </li>
                  <li className="list-inline-item mr-1">
                    <Link to="">
                      <img
                        src={visa}
                        className="avatar avatar-ex-sm"
                        title="Visa"
                        alt=""
                      />
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;

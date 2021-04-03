// React Basic and Bootstrap
import React, {Component} from "react";
import {Container, Row, Col} from "reactstrap";
import {Link} from "react-router-dom";

//Import Containers

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  render() {
    return (
      <React.Fragment>
        <Container className="pb-lg-4 mb-md-5 mb-4 mt-100 mt-60">
          <Row className="justify-content-center">
            <Col xs="12" className="text-center">
              <div className="section-title">
                <h4 className="title mb-4">
                  İhtiyacınız olan herşeyi ücretsiz denemek ister misiniz?
                </h4>
                <p className="text-muted para-desc mx-auto mb-0">
                  Sizde{" "}
                  <span className="text-primary font-weight-bold">
                    infpromo
                  </span>{" "}
                  ile Türkiye'de ki tüm Influencer etkileşim oranlarını ve detaylı etkileşim raporlarını{" "}
                  <span className="text-primary font-weight-bold">
                    ücretsiz
                  </span>{" "}
                  ve{" "}
                  <span className="text-primary font-weight-bold">
                    hızlıca
                  </span>{" "}
                  deneyebilirsiniz.
                </p>

                <div className="mt-4">
                  <Link to={'/register'} className="btn btn-primary mt-2 mr-2">
                    Ücretsiz Dene
                  </Link>
                  <Link to={'login'} className="btn btn-outline-primary mt-2">
                    Giriş Yap
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Client;

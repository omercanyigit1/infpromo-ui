// React Basic and Bootstrap
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Label,
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {connect} from 'react-redux';
import {postLoginUser, isLoggedIn} from '../../../../../appRedux/actions/';
//import moment from 'moment';
import {Alert} from 'antd';

//Import Icons
import FeatherIcon from "feather-icons-react";

// import images
import user01 from "../../../assets/images/user/01.jpg";

const PageCoverLogin = (props) => {

  //let history = useHistory();

  //states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, forceUpdate] = useState();

  //props
  const {postLoginUser, isLogged, isLoggedIn, user, errorLogin} = props;

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const onSubmit = () => {

    let values = {
      email: email,
      password: password
    }

    postLoginUser(values);
  };

  useEffect(() => {
    forceUpdate({});

  }, [email, password, isLoggedIn, isLogged, user, errorLogin]);

  return (
    <React.Fragment>
      <div className="back-to-home rounded d-sm-block">
        <Link to="/" className="btn btn-icon btn-soft-primary">
          <i>
            <FeatherIcon icon="home" className="icons" />
          </i>
        </Link>
      </div>

      <section className="cover-user bg-white">
        <Container fluid className="px-0">
          <Row className="no-gutters position-relative">
            <Col lg={4} xs={{ order: 2 }} className="cover-my-30">
              <div className="cover-user-img d-flex align-items-center">
                <Row>
                  <Col xs={12}>
                    <Card
                      className="login-page border-0"
                      style={{ zIndex: "1" }}
                    >
                      <CardBody className="p-0">
                        <h4 className="card-title text-center">Giri??</h4>
                        {errorLogin &&
                        <Alert
                          message="Hata!"
                          description={`${errorLogin}`}
                          type="error"
                          closable
                        />
                        }

                        <AvForm className="llogin-form mt-4" onSubmit={onSubmit}>
                          <Row>
                            <Col lg={12}>
                              <FormGroup className="position-relative">
                                <Label htmlFor="email">
                                  Email{" "}
                                  <span className="text-danger">*</span>
                                </Label>
                                <div className="position-relative">
                                  <i>
                                    <FeatherIcon
                                      icon="user"
                                      className="fea icon-sm icons"
                                    />
                                  </i>
                                </div>
                                <AvField
                                  type="text"
                                  onChange={handleEmailChange}
                                  className="form-control pl-5"
                                  name="email"
                                  id="email"
                                  placeholder="Email Giriniz"
                                  required
                                  errorMessage=""
                                  validate={{
                                    required: {
                                      value: true,
                                      errorMessage: "L??tfen email adresinizi giriniz.",
                                    },
                                    pattern: {
                                      value:
                                        "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                                      errorMessage: "Email adresi ge??erli de??il!",
                                    },
                                  }}
                                />
                              </FormGroup>
                            </Col>

                            <Col lg={12}>
                              <FormGroup className="position-relative">
                                <Label htmlFor="password">
                                  Parola
                                  <span className="text-danger">*</span>
                                </Label>
                                <div className="position-relative">
                                  <i>
                                    <FeatherIcon
                                      icon="lock"
                                      className="fea icon-sm icons"
                                    />
                                  </i>
                                </div>
                                <AvField
                                  type="password"
                                  onChange={handlePasswordChange}
                                  className="form-control pl-5"
                                  name="password"
                                  id="password"
                                  placeholder="Parola Giriniz"
                                  required
                                  errorMessage=""
                                  validate={{
                                    required: {
                                      value: true,
                                      errorMessage: "L??tfen parolan??z?? giriniz.",
                                    },
                                    minLength: {
                                      value: 6,
                                      errorMessage:
                                        "Your password must be between 6 and 8 characters",
                                    },
                                    maxLength: {
                                      value: 16,
                                      errorMessage:
                                        "Your password must be between 6 and 8 characters",
                                    },
                                  }}
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="12">
                              <div className="d-flex justify-content-between">
                                <FormGroup>
                                  <div className="custom-control custom-checkbox">
                                    <Input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="customCheck1"
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customCheck1"
                                    >
                                      Beni Hat??rla
                                    </Label>
                                  </div>
                                </FormGroup>
                                <p className="float-right forgot-pass">
                                  <Link
                                    to="/forget-password"
                                    className="text-dark font-weight-bold"
                                  >
                                    Parolam?? Unuttum ?
                                  </Link>
                                </p>
                              </div>
                            </Col>

                            <Col lg={12} className="mb-0">
                              <Button color="primary" block>
                                Giri?? Yap
                              </Button>
                            </Col>

                            <Col className="text-center">
                              <p className="mb-0 mt-3">
                                <small className="text-dark mr-2">
                                  Hesab??n??z Yok mu?
                                </small>{" "}
                                <Link
                                  to="/register"
                                  className="text-dark font-weight-bold"
                                >
                                  ??cretsiz Dene!
                                </Link>
                              </p>
                            </Col>
                          </Row>
                        </AvForm>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col
              lg={{ size: 8, offset: 4 }}
              xs={{ order: 1 }}
              className="padding-less img "
              style={{ backgroundImage: `url(${user01})` }}
            />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {

  return {
    user: state.user.user,
    token: state.auth.token,
    loading: state.auth.loading,
    errorLogin: state.auth.errorLogin,
    formLoading: state.auth.formLoading,
    isLogged: state.auth.isLogged
  }
};

export default connect(mapStateToProps, {postLoginUser, isLoggedIn})(PageCoverLogin);

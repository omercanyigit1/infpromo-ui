// React Basic and Bootstrap
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Input,
  Label,
  FormGroup,
  Card,
  CardBody,
} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {Spin, Result, Button, Alert} from 'antd';
import {connect} from 'react-redux';
import {postRegisterUser, isLoggedIn} from '../../../../../appRedux/actions/';

//Import Icons
import FeatherIcon from "feather-icons-react";

// import images
import user02 from "../../../assets/images/user/02.jpg";

const PageCoverSignup = (props) => {

  const {postRegisterUser, isLoggedIn, loading, errorRegister, isCreated} = props;

  //states
  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleSurNameChange(e) {
    setSurName(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  useEffect(() => {

  }, [email, password, name, surName, isLoggedIn, isCreated, errorRegister]);

  const handleSubmit = () => {

    let data = {
      "email": email,
      "name": name,
      "surName": surName,
      "password": password,
    }

    postRegisterUser(data);
  };

  if(isCreated) {
    return (
      <Spin spinning={loading}>
        <Result
          status="success"
          title="Hesabınız Başarıyla Oluşturuldu!"
          subTitle="Hemen üye girişi yapıp Infpromo dünyasını keşfedin..."
          extra={[
            <Link to={"login"} className={"btn btn-primary"} key="console">
              Giriş Yap
            </Link>,
          ]}
        />
      </Spin>
    )
  }

  return (
    <Spin spinning={loading}>
      <React.Fragment>
        <div className="back-to-home rounded d-sm-block">
          <Link to="/" className="btn btn-icon btn-soft-primary">
            <i>
              <FeatherIcon icon="home" className="icons"/>
            </i>
          </Link>
        </div>
        <section className="cover-user bg-white">
          <Container fluid className="px-0">
            <Row className="no-gutters position-relative">
              <Col lg={4} xs={{order: 2}} className="cover-my-30 ">
                <div className="cover-user-img d-flex align-items-center">
                  <Row>
                    <Col xs={12}>
                      <Card
                        className="login_page border-0"
                        style={{zIndex: 1}}
                      >
                        <CardBody className="p-0">
                          <h4 className="card-title text-center">Üye Ol</h4>
                          {errorRegister &&
                          <Alert
                            message="Hata!"
                            description={`${errorRegister}`}
                            type="error"
                            closable
                          />
                          }
                          <AvForm className="login-form mt-4">
                            <Row>
                              <Col md="6">
                                <FormGroup className="position-relative">
                                  <Label for="firstname">
                                    Adınız{" "}
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
                                    className="form-control pl-5"
                                    name="firstname"
                                    id="firstname"
                                    onChange={handleNameChange}
                                    placeholder="Adınız"
                                    required
                                    errorMessage=""
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage: "Lütfen isminizi giriniz.",
                                      },
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="6">
                                <FormGroup className="position-relative">
                                  <Label for="lastname">
                                    Soyadınız{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <div className="position-relative">
                                    <i>
                                      <FeatherIcon
                                        icon="user-check"
                                        className="fea icon-sm icons"
                                      />
                                    </i>
                                  </div>
                                  <AvField
                                    type="text"
                                    className="form-control pl-5"
                                    name="lastname"
                                    id="lastname"
                                    placeholder="Soyadınız"
                                    onChange={handleSurNameChange}
                                    required
                                    errorMessage=""
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage: "Lütfen soyadınızı giriniz.",
                                      },
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="12">
                                <FormGroup className="position-relative">
                                  <Label for="email">
                                    Email{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <div className="position-relative">
                                    <i>
                                      <FeatherIcon
                                        icon="mail"
                                        className="fea icon-sm icons"
                                      />
                                    </i>
                                  </div>
                                  <AvField
                                    type="text"
                                    className="form-control pl-5"
                                    name="email"
                                    id="email"
                                    onChange={handleEmailChange}
                                    placeholder="Email"
                                    required
                                    errorMessage=""
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage: "Lütfen Email adresinizi giriniz.",
                                      },
                                      pattern: {
                                        value:
                                          "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                                        errorMessage: "E-Mail is not valid!",
                                      },
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="12">
                                <FormGroup className="position-relative">
                                  <Label for="password">
                                    Parola{" "}
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
                                    className="form-control pl-5"
                                    name="password"
                                    id="password"
                                    onChange={handlePasswordChange}
                                    placeholder="Parola"
                                    required
                                    errorMessage=""
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage: "Lütfen parola belirtiniz.",
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
                              <Col md="12">
                                <FormGroup className="position-relative">
                                  <Label for="confirmpassword">
                                    Parola Tekrar{" "}
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
                                    className="form-control pl-5"
                                    name="confirmpassword"
                                    id="confirmpassword"
                                    placeholder="Parola Tekrar"
                                    required
                                    errorMessage=""
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage: "Lütfen parolanızı tekrar giriniz.",
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
                              <Col md="12">
                                <FormGroup>
                                  <div className="custom-control custom-checkbox">
                                    <Input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="customCheck1"
                                      required
                                      validate={{
                                        required: {
                                          value: true,
                                          errorMessage: "Lütfen Gizlilik Sözleşmesini kabul edin.",
                                        },
                                      }}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      for="customCheck1"
                                    >
                                      <Link to="#" className="text-primary">
                                        Gizilik Sözleşmesi
                                      </Link>ni okudum ve kabul ediyorum.{" "}
                                    </Label>
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col md="12" className="mb-0">
                                <Button className={"btn btn-primary"} block onClick={handleSubmit} loading={loading}>
                                  Üye Ol
                                </Button>
                              </Col>
                              <Col className="mx-auto">
                                <p className="mb-0 mt-3">
                                  <small className="text-dark mr-2">
                                    Hesabınız zaten var mı?
                                  </small>{" "}
                                  <Link
                                    to="/login"
                                    className="text-dark font-weight-bold"
                                  >
                                    Giriş Yap
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
              <Col lg={8} className="offset-lg-4 padding-less img order-1" style={{backgroundImage: `url(${user02})`}}/>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    </Spin>
  );
}

const mapStateToProps = (state) => {

  return {
    loading: state.auth.loading,
    errorRegister: state.auth.errorRegister,
    isCreated: state.auth.isCreated,
    isLogged: state.auth.isLogged
  }
};

export default connect(mapStateToProps, {postRegisterUser, isLoggedIn})(PageCoverSignup);

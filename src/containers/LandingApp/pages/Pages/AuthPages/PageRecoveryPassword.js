// React Basic and Bootstrap
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Label,
  FormGroup,
  Card,
  CardBody,
} from "reactstrap";
import {Result, Spin} from "antd";
import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Icons
import FeatherIcon from "feather-icons-react";

// import images
import recoveryimg from "../../../assets/images/user/recovery.png";
import {postResetPassword, getResetPassword} from "../../../../../appRedux/actions";
import {connect} from 'react-redux';

const PageRecoveryPassword = (props) => {
  let params = useParams();
  const {getResetPassword, error, postResetPassword, user, loading, isRecoveryPassword} = props;
  const [password, setPassword] = useState('');
  const [isMatch, setIsMatch] = useState(false);

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleClick() {
    let data = {
      "password": password
    }

    postResetPassword(data, user.resetPasswordToken);
  }

  useEffect(() => {
    getResetPassword(params.id);

  }, [])

  if(isRecoveryPassword) {
    return (
      <Spin spinning={loading}>
        <Result
          status="success"
          title="Parolanız Güncellendi!"
          subTitle="Yeni parolanızla hemen giriş yapabilirsiniz."
          extra={[
            <Link to={"/login"} className={"btn btn-primary"} key="console">
              Giriş
            </Link>,
          ]}
        />
      </Spin>
    )
  }

  if(isMatch === true) {
    return (
      <Spin spinning={loading}>
        <Result
          status="warning"
          title="Link Hatalı ve Süresi Dolmuş!"
          subTitle="Lütfen mailinize gönderilen linke tıklayınız. Eğer parolanızı hatırlıyorsanız hemen giriş yapabilirsiniz."
          extra={[
            <Link to={"/login"} className={"btn btn-primary"} key="console">
              Giriş
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
              <FeatherIcon icon="home" className="icons" />
            </i>
          </Link>
        </div>
        <section className="bg-home d-flex align-items-center">
          <Container>
            <Row className="align-items-center">
              <Col lg="7" md="6">
                <div className="mr-lg-5">
                  <img
                    src={recoveryimg}
                    className="img-fluid d-block mx-auto"
                    alt=""
                  />
                </div>
              </Col>
              <Col lg="5" md="6" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                <Card className="login_page shadow rounded border-0">
                  <CardBody>
                    <h4 className="card-title text-center">Parolamı Güncelle</h4>
                    <AvForm className="login-form mt-4">
                      <Row>
                        <Col lg="12">
                          <p className="text-muted">
                            Parolanızı Buradan Güncelleyebilirsiniz.
                          </p>
                        </Col>
                        <Col lg="12">
                          <FormGroup className="position-relative">
                            <Label htmlFor="password">
                              Yeni Parola
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
                              placeholder="Parola Giriniz"
                              required
                              errorMessage=""
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: "Lütfen parolanızı giriniz.",
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
                          <FormGroup className="position-relative">
                            <Label htmlFor="password">
                              Yeni Parola Tekrar
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
                              placeholder="Parola Giriniz"
                              required
                              errorMessage=""
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: "Lütfen parolanızı giriniz.",
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
                          <Button color="primary" block onClick={handleClick}>
                            Güncelle
                          </Button>
                        </Col>
                      </Row>
                    </AvForm>
                  </CardBody>
                </Card>
              </Col>
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
    error: state.auth.error,
    isRecoveryPassword: state.auth.isRecoveryPassword,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {postResetPassword, getResetPassword})(PageRecoveryPassword);

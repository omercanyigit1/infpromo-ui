// React Basic and Bootstrap
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import {Alert, notification, Result, Spin} from "antd";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {postForgetPassword} from "../../../../../appRedux/actions";
import {connect} from 'react-redux';

//Import Icons
import FeatherIcon from "feather-icons-react";

// import images
import user03 from "../../../assets/images/user/03.jpg";

const PageCoverRePassword = (props) => {
  const {postForgetPassword, loading, errorForget, isResetPassword} = props;
  const [email, setEmail] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleClick() {
    let data = {
      "email": email
    }

    if(!errorForget) {
      postForgetPassword(data);
    } else {
      notification['error']({
        message: 'Başarısız',
        description: `${errorForget}`
        ,
      });
    }
  }

  useEffect(() => {

  }, [isResetPassword, errorForget])

  if(isResetPassword) {
    return (
      <Spin spinning={loading}>
        <Result
          status="success"
          title="Mail Gönderildi!"
          subTitle="Girdiğiniz Email adresinize gelen linke tıklayarak parolanızı güncelleyebilirsiniz."
          extra={[
            <Link to={"/"} className={"btn btn-primary"} key="console">
              Anasayfa
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

        <section className="cover-user bg-white">
          <Container fluid className="px-0">
            <Row className="no-gutters position-relative">
              <Col lg={4} xs={{ order: 2 }} className="cover-my-30">
                <div className="cover-user-img d-flex align-items-center">
                  <Row>
                    <Col xs={12}>
                      <Card
                        className="login_page border-0"
                        style={{ zIndex: 1 }}
                      >
                        <CardBody className="p-0">
                          <h4 className="card-title text-center">
                            Parolamı Unuttum !
                          </h4>
                          <AvForm className="login-form mt-4" onSubmit={handleClick}>
                            <Row>
                              <Col lg="12">
                                <p className="text-muted">
                                  Lütfen Email adresinizi yazınız ve size mail gönderilen uzantıya tıklanıyız.
                                </p>
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
                                    placeholder="Email Yazınız..."
                                    onChange={handleEmailChange}
                                    required
                                    errorMessage=""
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage: "Please enter your email",
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
                              <Col lg="12">
                                <Button color="primary" block>
                                  Gönder
                                </Button>
                              </Col>
                              <div className="mx-auto">
                                <p className="mb-0 mt-3">
                                  <small className="text-dark mr-2">
                                    Parolanızı Hatırladınız mı ?
                                  </small>{" "}
                                  <Link
                                    to="/login"
                                    className="text-dark font-weight-bold"
                                  >
                                    Giriş Yap
                                  </Link>
                                </p>
                              </div>
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
                className="padding-less img"
                style={{ backgroundImage: `url(${user03})` }}
              ></Col>
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
    errorForget: state.auth.errorForget,
    isResetPassword: state.auth.isResetPassword
  }
}

export default connect(mapStateToProps, {postForgetPassword})(PageCoverRePassword);

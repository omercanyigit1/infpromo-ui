import React, {useEffect, useState} from 'react';
import {Card, Input, Spin, Button, Row, Col, Form, notification} from 'antd';
import {connect} from 'react-redux';
import {updateUser, isLoggedIn} from "../../appRedux/actions";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const AccountPage = (props) => {
  const [form] = Form.useForm();
  const {user, loading, updateUser, errorUpdateUser} = props;
  const [name, setName] = useState(user.name);
  const [surName, setSurName] = useState(user.surName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

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

  }, [user, email])

  const onFinish = (values) => {

    let email1 = values.email ? values.email : user.email;
    let name1 = values.name ? values.name : user.name;
    let surName1 = values.surName ? values.surName : user.surName;

    if(values.password) {

      let newData = {
        "email": email1,
        "password": values.password,
        "name": name1,
        "surName": surName1
      }

      updateUser(newData);
    } else {
      let newData = {
        "email": email1,
        "name": name1,
        "surName": surName1
      }

      updateUser(newData);
    }

    if(!errorUpdateUser) {
      notification['success']({
        message: 'Başarılı',
        description:
          'Kullanıcı başarılı şekilde güncellendi.',
      });
    } else {
      notification['error']({
        message: 'Başarısız',
        description:
          'Kullanıcı güncellenemedi.',
      });
    }
  };

  return (
    <Spin spinning={loading}>
      <div>
        <div className="title-heading gx-mb-5">
          <h3 className="title mb-1">
            Hesabımı Düzenle
          </h3>
          <p className="text-muted">
            Hesabınızı kolayca güncelleyebilirsiniz.
          </p>
        </div>

        <Card title={`Bilgilerim`}>
          <div>
            <Row align={"middle"} justify={"center"}>
              <Col xs={24} md={16}>
                <Form
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  scrollToFirstError
                  {...formItemLayout}
                >
                  <Row gutter={[20, 20]}>
                    <Col xs={24} md={12}>
                      <Row gutter={[10, 10]}>
                        <Col xs={24} md={12}>
                          <Form.Item name="name" label="İsim" initialValue={user.name}>
                            <Input onChange={handleNameChange}  />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="surName" label="Soyisim" initialValue={user.surName}>
                            <Input onChange={handleSurNameChange}  />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item name="email" label="Email" initialValue={user.email}>
                        <Input onChange={handleEmailChange}  />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name="password" label="Yeni Parola">
                        <Input.Password placeholder={"Yeni parolanızı giriniz"} onChange={handlePasswordChange}  />
                      </Form.Item>
                      <Form.Item name="confirmPassword" label="Yeni Parola Tekrar">
                        <Input.Password placeholder={"Yeni parolanızı tekrar giriniz"} />
                      </Form.Item>
                      <Form.Item style={{textAlign: 'right'}}>
                        <Button className={"btn btn-primary"} htmlType={"submit"}>Düzenle</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    </Spin>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    errorUpdateUser: state.user.errorUpdateUser,
    user: state.user.user
  }
}

export default connect(mapStateToProps, {updateUser, isLoggedIn})(AccountPage);

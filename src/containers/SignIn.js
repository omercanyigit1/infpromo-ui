import React, {useEffect} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
//import {userSignIn} from "../appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import InfoView from "components/InfoView";

const FormItem = Form.Item;

const SignIn = (props) => {
  const dispatch = useDispatch();
  //const token = useSelector(({auth}) => auth.token);
  const token = '123';

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        //dispatch(userSignIn(values));
      }
    });
  };

  useEffect(() => {
    if (token !== null) {
      //props.history.push('/');
    }
  });

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
              <img src="https://via.placeholder.com/272x395" alt='Neature'/>
            </div>
            <div className="gx-app-logo-wid">
              <h1><IntlMessages id="app.userAuth.signIn"/></h1>
              <p><IntlMessages id="app.userAuth.bySigning"/></p>
              <p><IntlMessages id="app.userAuth.getAccount"/></p>
            </div>
            <div className="gx-app-logo">
              <img alt="example" src="assets/images/logo.png"/>
            </div>
          </div>
          <div className="gx-app-login-content">
            <Form onSubmit={handleSubmit} className="gx-signin-form gx-form-row0">

              <FormItem name="email" rules={[{ required: true }]}>
                <Input placeholder="Email"/>
              </FormItem>
              <FormItem name="password" rules={[{ required: true }]}>
                <Input type="password" placeholder="Password"/>
              </FormItem>
              <FormItem>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signIn"/>
                </Button>
                <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signup"><IntlMessages
                id="app.userAuth.signUp"/></Link>
              </FormItem>
              <span
                className="gx-text-light gx-fs-sm"> demo user email: 'demo@example.com' and password: 'demo#123'</span>
            </Form>
          </div>
          <InfoView/>
        </div>
      </div>
    </div>
  );
};

//const WrappedNormalLoginForm = Form.create()(SignIn);

export default SignIn;

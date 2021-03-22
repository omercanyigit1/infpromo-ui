import React, {useEffect, useState} from 'react';
import {Card, Input, Spin, Button, Row, Col} from 'antd';
import {connect} from 'react-redux';
import {updateUser, isLoggedIn} from "../../appRedux/actions";

const AccountPage = (props) => {
  const {user, loading, error, updateUser, isLoggedIn} = props;
  const [email, setEmail] = useState('');

  useEffect(() => {

  }, [user, email])

  function handleEdit() {

    let data = {
      "email": email
    }

    updateUser(data);
  }

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

        <Card title={"Hesabım"}>
          <div>
            <p><b>Email: </b> {user.email}</p>

            <Row align={"middle"}>
              <Col md={6}>
                <Input name={"email"} placeholder={"Yeni Email Adresini Giriniz."} onChange={(e) => {
                  setEmail(e.target.value);
                }} />
              </Col>
              <Col md={12}>
                <Button className={"btn btn-primary"} onClick={handleEdit}>Güncelle</Button>
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
    loading: state.list.loading,
    error: state.list.error,
    user: state.user.user
  }
}

export default connect(mapStateToProps, {updateUser, isLoggedIn})(AccountPage);

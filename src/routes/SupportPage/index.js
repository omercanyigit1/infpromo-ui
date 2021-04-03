import React, {useEffect, useState} from 'react';
import {Card, Input, Spin, Button, Row, Col, Form, notification, Result} from 'antd';
import {connect} from 'react-redux';
import {postTicket, isLoggedIn} from "../../appRedux/actions";
//import {Link} from "react-router-dom";

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

const SupportPage = (props) => {
  const [form] = Form.useForm();
  const {user, loading, postTicket, errorTicket, isTicketSend} = props;
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  function handleSubjectChange(e) {
    setSubject(e.target.value);
  }
  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  useEffect(() => {

  }, [user])

  const onFinish = (values) => {

    let newData = {
      "subject": values.subject,
      "message": values.message,
      "email": user.email
    }

    postTicket(newData);

    if(!errorTicket) {
      notification['success']({
        message: 'Başarılı',
        description:
          'Mesajınız başarı ile iletildi.',
      });
    } else {
      notification['error']({
        message: 'Başarısız',
        description:
          'Mesajınız İletilemedi!.',
      });
    }
  };

  if(isTicketSend) {
    return (
      <Spin spinning={loading}>
        <div>
          <div className="title-heading gx-mb-5">
            <h3 className="title mb-1">
              Destek
            </h3>
            <p className="text-muted">
              Destek ekibimiz sizlere hızlı şekilde cevap verecektir.
            </p>
          </div>
          <Card title={`Destek Ekibine Mesaj`}>
            <Result
              status="success"
              title="Destek Talebiniz Başarı ile gönderildi."
              subTitle="En kısa sürede mail adresinize geri dönüş yapılacaktır."
              extra={null}
            />
          </Card>
        </div>
      </Spin>
    )
  }

  return (
    <Spin spinning={loading}>
      <div>
        <div className="title-heading gx-mb-5">
          <h3 className="title mb-1">
            Destek
          </h3>
          <p className="text-muted">
            Destek ekibimiz sizlere hızlı şekilde cevap verecektir.
          </p>
        </div>

        <Card title={`Destek Ekibine Mesaj`}>
          <div>
            <Row align={"middle"} justify={"center"}>
              <Col xs={24} md={14}>
                <Form
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  scrollToFirstError
                  {...formItemLayout}
                >
                  <Row gutter={[20, 20]}>
                    <Col xs={24} md={24}>
                      <Row gutter={[10, 10]}>
                        <Col xs={24} md={24}>
                          <Form.Item name="subject" label="Konu Başlığı" style={{marginBottom: 5}}>
                            <Input onChange={handleSubjectChange} placeholder={"Danışmak istediğiniz konuyu buraya yazabilirsiniz."} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={24}>
                          <Form.Item name="message" label="Mesajınız">
                            <Input.TextArea onChange={handleMessageChange} rows={6} placeholder={"Danışmak istediğiniz mesajı buraya yazabilirsiniz."} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={[10, 10]}>
                        <Col xs={24} md={24}>
                          <Form.Item style={{textAlign: 'right'}}>
                            <Button className={"btn btn-primary"} htmlType={"submit"} disabled={!subject || !message}>Gönder</Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={12}>
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
    errorTicket: state.user.errorTicket,
    user: state.user.user,
    isTicketSend: state.user.isTicketSend
  }
}

export default connect(mapStateToProps, {postTicket, isLoggedIn})(SupportPage);

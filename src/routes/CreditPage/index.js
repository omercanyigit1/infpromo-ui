import React, {useEffect, useState} from 'react';
import {Card, Input, InputNumber, Row, Col, Button, Spin, Alert} from 'antd';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import {AvField} from "availity-reactstrap-validation";
import {FormGroup} from "reactstrap";
import {postPayment, isLoggedIn, postSearchAdvanced, postGeneratePdf} from '../../appRedux/actions/';
import {connect} from 'react-redux';

const CreditPage = (props) => {
  const [value, setValue] = useState(null);
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [issuer, setIssuer] = useState('');

  const  {postPayment, isLoggedIn, loading, error, user, isPayment} = props;

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setIssuer(issuer);
    }
  };

  //payment fields
  function handleCvcChange(e) {
    setCvc(e.target.value);
  }
  function handleExpiryChange(e) {
    setExpiry(e.target.value);
  }
  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }
  function handleCardNumberChange(e) {
    setCardNumber(e.target.value);
  }
  function handleFocusChange(e) {
    setFocus(e.target.name);
  }

  function onChange(value) {
    setValue(value);
  }

  function handlePayment() {

    let data = {
      "credit": value
    }

    postPayment(data);
  }

  useEffect(() => {

  }, [value])

  return (
    <Spin spinning={loading}>
      <div>
        <div className="title-heading gx-mb-5">
          <h3 className="title mb-1">
            Hemen Kredi Yükle
          </h3>
          <p className="text-muted">
            Arama yapmak ve güncel raporları takip edebilmek için hızlıca kredi yükleyebilirsiniz.
          </p>
        </div>
        <Card title={"Hızlıca Kredi Yükleyin"}>
          {isPayment &&
            <Row>
              <Col span={6}>
                <Alert message="Krediniz başarı ile yüklendi." type="success" closable />
              </Col>
            </Row>
          }
          <Row>
            <Col span={24}>
              {value &&
              <div className={"gx-mb-5 gx-mt-3"}>
                <h3>{value} Arama İmkanı - {value / 2} Raporlama</h3>
              </div>
              }
              {!value &&
              <div className={"gx-mb-5 gx-mt-3"}>
                <h3>0 Arama İmkanı - 0 Raporlama</h3>
              </div>
              }
            </Col>
          </Row>

          <Row gutter={[10, 10]} align={"top"} justify={"center"}>
            <Col span={4} />
            <Col span={8}>
              <p style={{marginBottom: 5}}>Kredi Miktarı:</p>
              <InputNumber keyboard={true} min={0} max={100} style={{width: '50%'}} placeholder={"Miktar"} onChange={onChange} />
            </Col>
            <Col span={8}>
              <p style={{marginBottom: 0}}>Ödenecek Tutar:</p>
              <h3>
                <b>{value} $ ({value} dolar)</b>
              </h3>
            </Col>
            <Col span={4} />
          </Row>

          <div className={"gx-mt-5"}>
            <Row gutter={[30]} justify={"center"} align={"middle"} className={"payment-details"}>
              <Col xs={24} md={9}>
                <Cards
                  cvc={cvc}
                  expiry={expiry}
                  focused={focus}
                  name={cardName}
                  number={cardNumber}
                  callback={handleCallback}
                  style={{marginBottom: 30}}
                />
              </Col>
              <Col xs={24} md={6}>
                <Card>
                  <Row>
                    <Col span={24}>
                      <Input name={"number"} onChange={handleCardNumberChange} placeholder="Kart Numarası" onFocus={handleFocusChange} style={{marginBottom: 15}} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Input name={"name"} onChange={handleCardNameChange} placeholder="İsim Soyisim" onFocus={handleFocusChange} style={{marginBottom: 15}} />
                    </Col>
                  </Row>
                  <Row gutter={[10, 10]}>
                    <Col span={16}>
                      <Input name={"expiry"} onChange={handleExpiryChange} placeholder="MM / YY" onFocus={handleFocusChange} style={{marginBottom: 15}} />
                    </Col>
                    <Col span={8}>
                      <Input name={"cvc"} onChange={handleCvcChange} placeholder="CVC" onFocus={handleFocusChange} style={{marginBottom: 15}} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Button className={"btn- btn-primary"} block onClick={handlePayment}>Hemen Üye Ol!</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={6} />
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
    error: state.user.error,
    user: state.user.user,
    isPayment: state.user.isPayment
  }
}

export default connect(mapStateToProps, {postPayment, isLoggedIn})(CreditPage);

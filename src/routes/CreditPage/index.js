import React, {useEffect, useState} from 'react';
import {Card, Input, Row, Col, Button, Spin, Alert} from 'antd';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import {postPayment, isLoggedIn} from '../../appRedux/actions/';
import {connect} from 'react-redux';

const CreditPage = (props) => {
  const [value, setValue] = useState(null);
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [issuer, setIssuer] = useState('');

  const  {postPayment, loading, isPayment} = props;

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

  function onChange(e) {
    setValue(e.target.value);
  }

  function handlePayment() {

    let data = {
      "credit": parseInt(value)
    }

    postPayment(data);
  }

  useEffect(() => {

  }, [value, issuer])

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
              <Col xs={24} md={6}>
                <Alert message="Krediniz başarı ile yüklendi." type="success" closable />
              </Col>
            </Row>
          }

          <Row gutter={[10, 10]} align={"middle"} justify={"center"}>
            <Col xs={24} md={14}>
              <Row>
                <Col xs={24} md={24}>
                  <p style={{marginBottom: 10}}><b>Kredi Miktarı:</b></p>
                  <Input className={"credit-input"} style={{width: '50%'}} placeholder={"Miktar"} onChange={onChange} />
                </Col>
                <Col xs={24} md={24}>
                  {value &&
                  <div className={"gx-mt-4 gx-pb-3"}>
                    <h5>{value} Arama / {value / 2} Raporlama
                      <span style={{fontSize: 14, marginLeft: 10}}> (Yüklenecek Tutar: {value} Kredi)</span>
                    </h5>
                  </div>
                  }
                  {!value &&
                  <div className={"gx-mt-4 gx-pb-3"}>
                    <h5>0 Arama / 0 Raporlama</h5>
                  </div>
                  }
                </Col>
                <Col span={24}>
                  <h3 className={"gx-mt-5 credit-page-margin gx-text-right"}>
                    <b>Tutar: {value} $ ({value} dolar)</b>
                  </h3>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={10}>
              <Row gutter={[30]} justify={"center"} align={"middle"} className={"payment-details"}>
                <Col xs={24} md={24}>
                  <Cards
                    cvc={cvc}
                    expiry={expiry}
                    focused={focus}
                    name={cardName}
                    number={cardNumber}
                    locale={{valid: 'MM / YY'}}
                    placeholders={{name: 'AD SOYAD'}}
                    callback={handleCallback}
                    style={{marginBottom: 30}}
                  />
                </Col>
                <Col xs={24} md={24}>
                  <Row justify={"center"} className={"gx-mt-3"}>
                    <Col xs={24} md={18}>
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
                            <Button className={"btn- btn-primary"} block onClick={handlePayment}>Hemen Öde</Button>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
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
    isPayment: state.list.isPayment
  }
}

export default connect(mapStateToProps, {postPayment, isLoggedIn})(CreditPage);

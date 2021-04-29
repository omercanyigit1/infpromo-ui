import React, {useEffect, useState} from 'react';
import {Card, Input, Row, Col, Button, Spin, Alert, Radio, Divider} from 'antd';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import {postPayment, isLoggedIn, postSelectedPrice} from '../../appRedux/actions/';
import {connect} from 'react-redux';
import publicIp from "public-ip";
import InputMask from 'react-input-mask';
import PricingList from "./components/PricingList";
import {ArrowLeftOutlined} from "@ant-design/icons";

export const getClientIp = async () => await publicIp.v4({
  fallbackUrls: [ "https://ifconfig.co/ip" ]
});

const CreditPage = (props) => {
  const [value, setValue] = useState(null);
  const [credit, setCredit] = useState(null);
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [issuer, setIssuer] = useState('');
  const [ip, setIp] = useState('');
  const [currency, setCurrency] = useState('');
  const [orderId, setOrderId] = useState(1000);
  const [priceList, setPriceList] = useState(true);

  const  {postPayment, loading, isPayment, isLogged, isLoggedIn, url, selectedCredit, selectedCurrency, postSelectedPrice, showList} = props;

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
  function handlePhoneNumberChange(e) {
    setPhoneNumber(e.target.value);
  }
  function handleFocusChange(e) {
    setFocus(e.target.name);
  }

  function onChange(e) {

    switch (e.target.value) {
      case 5:
        setValue(5);
        setCredit(10);
        break;
      case 10:
        setValue(10);
        setCredit(20);
        break;
      case 20:
        setValue(20);
        setCredit(45);
        break;
      case 50:
        setValue(50);
        setCredit(110);
        break;
      case 100:
        setValue(100);
        setCredit(225);
        break;
      default:
        setValue(e.target.value);
        setCredit(e.target.value * 2);
        break;
    }
  }

  function handlePayment() {
    setOrderId(+ 1);

    let month = (expiry.length < 2 ? `0${expiry.substring(0, 2)}` : expiry.substring(0, 2));
    let year = expiry.substring(3, 5);
    //setCurrencyValue();

    let data = {
      "credit": parseInt(selectedCredit),
      "currency": `${selectedCurrency},90`,
      "cardNumber": cardNumber.replace(/\s/g, ''),
      "cardName": cardName.replace(/\s/g, ''),
      "cardCvc": cvc,
      "cardMonth": month,
      "cardYear": year,
      "userIp": ip,
      "userPhone": phoneNumber.substring(1, 11)
    }
    postPayment(data);
  }

  useEffect(() => {

    getClientIp().then((result) => {
      setIp(result);
    })

    isLoggedIn()

    if(url) {
      window.location.href = `${url}`;
    }

  }, [value, issuer, credit, isLogged, url])

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

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
            {showList === true &&
            <Col xs={24} md={24}>
              <Row>
                <Col xs={24} md={24}>
                  <Row>
                    <Col xs={24} md={8}>
                      <PricingList
                        title="5"
                        desc="20"
                        features={[
                          { title: "5 Arama İmkanı" },
                          { title: "2 Detaylı Rapor" },
                        ]}
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <PricingList
                        title="15"
                        desc="40"
                        features={[
                          { title: "15 Arama İmkanı" },
                          { title: "7 Detaylı Rapor" },
                        ]}
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <PricingList
                        title="30"
                        desc="80"
                        features={[
                          { title: "30 Arama İmkanı" },
                          { title: "15 Detaylı Rapor" },
                        ]}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24} md={8}>
                      <PricingList
                        title="65"
                        desc="150"
                        features={[
                          { title: "65 Arama İmkanı" },
                          { title: "30 Detaylı Rapor" },
                        ]}
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <PricingList
                        title="165"
                        desc="350"
                        features={[
                          { title: "165 Arama İmkanı" },
                          { title: "82 Detaylı Rapor" },
                        ]}
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <PricingList
                        title="350"
                        desc="700"
                        features={[
                          { title: "350 Arama İmkanı" },
                          { title: "175 Detaylı Rapor" },
                        ]}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            }
            {showList === false &&
            <Col xs={24} md={24}>
              <Row gutter={[30]} className={"payment-details"}>
                <Col xs={24} md={12}>
                  <Button type={"link"} icon={<ArrowLeftOutlined />} onClick={() => {

                    let data = {
                      title: '',
                      desc: '',
                      list: true
                    }

                    postSelectedPrice(data);
                  }}>
                    <span>Başka Paket Seç</span>
                  </Button>
                  <div className={"gx-mt-4"}>
                    <h5><i className="uil uil-check-circle align-middle"></i> {selectedCredit} Arama</h5>
                  </div>
                  <div className={"gx-mt-2"}>
                    <h5><i className="uil uil-check-circle align-middle"></i> {parseFloat( `${selectedCredit}` / 2).toFixed(0)} Rapor</h5>
                  </div>

                  <div className={"gx-mt-2"}>
                    <h6><i className="uil uil-check-circle align-middle"></i> (Yüklenecek toplam kredi miktari: {selectedCredit} Kredi)</h6>
                  </div>
                  <h3 className={"gx-mt-4 credit-page-margin gx-text-left"}>
                    <b>Tutar: {selectedCurrency} ₺ ({selectedCurrency} TL)</b>
                  </h3>
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col xs={24} md={24}>
                      <Cards
                        cvc={cvc}
                        expiry={expiry}
                        focused={focus}
                        name={cardName}
                        number={cardNumber}
                        locale={{valid: 'AA / YY'}}
                        placeholders={{name: 'AD SOYAD'}}
                        callback={handleCallback}
                        style={{marginBottom: 30}}
                      />
                    </Col>
                    <Col xs={24} md={24}>
                      <Row justify={"center"} className={"gx-mt-3"}>
                        <Col xs={24} md={24}>
                          <Card>
                            <Row>
                              <Col span={24}>
                                <label><b>Telefon Numaranız: (zorunlu)</b> </label>
                                <InputMask mask="09999999999" maskChar={null} placeholder={"5xx-xxx-xx-xx"} onChange={handlePhoneNumberChange} className={"ant-input"} style={{marginBottom: 15}} />
                              </Col>
                            </Row>
                            <Divider style={{marginBottom: 10, marginTop: 0}} />
                            <Row>
                              <Col span={24}>
                                <label><b>Kart Bilgileriniz:</b> </label>
                                <InputMask name={"number"} mask="9999 9999 9999 9999" className={"ant-input"} onChange={handleCardNumberChange} placeholder="Kart Numarası" onFocus={handleFocusChange} style={{marginBottom: 15}} />
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24}>
                                <Input name={"name"} onChange={handleCardNameChange} placeholder="İsim Soyisim" onFocus={handleFocusChange} style={{marginBottom: 15}} />
                              </Col>
                            </Row>
                            <Row gutter={[10, 10]}>
                              <Col span={16}>
                                <InputMask name={"expiry"} mask="99/99" className={"ant-input"} onChange={handleExpiryChange} placeholder="AA / YY" onFocus={handleFocusChange} style={{marginBottom: 15}} />
                              </Col>
                              <Col span={8}>
                                <InputMask name={"cvc"} mask="999" className={"ant-input"} onChange={handleCvcChange} placeholder="CVC" onFocus={handleFocusChange} style={{marginBottom: 15}} />
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24}>
                                <Button className={"btn- btn-primary"} block onClick={handlePayment} disabled={!phoneNumber || !cardName || !cardNumber || cvc.length < 3 || !expiry} loading={loading}>Hemen Öde</Button>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            }
          </Row>
        </Card>
      </div>
    </Spin>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    isLogged: state.auth.isLogged,
    error: state.user.error,
    user: state.user.user,
    isPayment: state.list.isPayment,
    url: state.list.url,
    selectedCredit: state.list.selectedCredit,
    selectedCurrency: state.list.selectedCurrency,
    showList: state.list.showList
  }
}

export default connect(mapStateToProps, {postPayment, isLoggedIn, postSelectedPrice})(CreditPage);


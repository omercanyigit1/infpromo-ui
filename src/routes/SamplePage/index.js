import React, {useState, useEffect} from "react";
import {Radio, Card, Select, Row, Col, Tooltip, Input, Spin, Button, message, Pagination, List, Avatar, Skeleton} from 'antd';
import {InfoCircleOutlined, SortDescendingOutlined} from '@ant-design/icons';
import debounce from 'lodash/debounce';
import CardList from "./components/CardList";
import CardListTable from "./components/CardListTable";
import {connect} from 'react-redux';
import {postSearchAdvanced, postPagination, postSearchUserName, postGeneratePdf, isLoggedIn} from "../../appRedux/actions";
import data from './../../constants/data.json';
import {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import PdfDocument from "./components/PdfDocument";

const {Option} = Select;

const interests = [];
for (let i = 0; i < data.interests.length; i++) {
  interests.push(<Option key={data.interests[i].id} value={data.interests[i].id}>{data.interests[i].name}</Option>);
}

const languages = [];
for (let i = 0; i < data.languages.length; i++) {
  languages.push(<Option key={data.languages[i].code} value={data.languages[i].code}>{data.languages[i].name}</Option>);
}

const rate = [];
for (let i = 1; i < 21; i++) {
  rate.push(<Option key={i.toString(21) + i} value={i}>≥ {i} %</Option>);
}

const CardTitle = ({title, subTitle}) => {
  return (
    <div>
      {title}
      <span className="para-desc text-muted" style={{fontSize: 13, marginLeft: 10}}>
        ( {subTitle} )
      </span>
    </div>
  )
}

const SamplePage = (props) => {
  const [value, setValue] = useState('');
  const [network, setNetwork] = useState('instagram');
  const [followersFrom, setFollowersFrom] = useState(20000);
  const [followersTo, setFollowersTo] = useState(10000000);
  const [gender, setGender] = useState('');
  const [interest, setInterests] = useState([]);
  const [relevance, setRelevance] = useState([]);
  const [language, setLanguages] = useState('tr');
  const [engagementRate, setEngagementRate] = useState(0);
  const [contactDetails, setContactDetails] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [spanName, setSpanName] = useState('');
  const [selectedItem, setSelectedItem] = useState({});

  const {
    searchList,
    postSearchAdvanced,
    postPagination,
    postSearchUserName,
    directs,
    loading,
    total,
    postGeneratePdf,
    reportData,
    reportDataLoading,
    showSorting,
    reportId,
    user
  } = props;

  useEffect(() => {

  }, [total, reportDataLoading, directs, showLoading, reportData, reportId, postGeneratePdf]);

  function handleNetworkChange(e) {
    setNetwork(e.target.value);
  }

  function handleFollowerFromChange(value) {
    setFollowersFrom(value);
  }

  function handleFollowerToChange(value) {
    setFollowersTo(value);
  }

  function handleGenderChange(value) {
    setGender(value);
  }

  function handleInterestsChange(value) {
    setInterests(value);
  }

  function handleLanguagesChange(value) {
    //console.log(value);
  }

  function handleEngagementRateChange(value) {
    setEngagementRate(value);
  }

  function handleContactDetailsChange(value) {
    setContactDetails(value);
  }

  function handleSortChange(value) {
    console.log(`selected ${value}`);
  }

  function handleFilter() {

    let data = {
      "sort": {
        "field": "followers",
        "direction": "desc"
      },
      "page": page,
      "filter": {
        "influencer": {
          "location": [174737],
          "followers": {
            "min": parseInt(followersFrom),
            "max": parseInt(followersTo)
          },
          "engagementRate": parseInt(engagementRate),
          "language": language,
          "gender": gender
        }
      }
    }

    if (user.credit < 1) {
      message.error(`Yetersiz Bakiye`);
    } else {
      postSearchAdvanced(data, network);
    }
  }

  function handleFilterUserName() {

    let data = {
      "sort": {
        "field": "followers",
        "direction": "desc"
      },
      "page": 0,
      "filter": {
        "influencer": {
          "relevance": [value]
        }
      }
    }

    if (user.credit < 1) {
      message.error(`Yetersiz Bakiye`);
    } else {
      postSearchUserName(data, network);
    }
  }

  function handlePagination() {

    let data = {
      "sort": {
        "field": "followers",
        "direction": "desc"
      },
      "page": page,
      "filter": {
        "influencer": {
          "location": [174737],
          "followers": {
            "min": parseInt(followersFrom),
            "max": parseInt(followersTo)
          },
          "engagementRate": parseInt(engagementRate),
          "language": language,
          "gender": gender
        }
      }
    }

    if (user.credit < 1) {
      message.error(`Yetersiz Bakiye`);
    } else {
      postPagination(data, network);
    }
  }

  function handleValue(e) {
    setValue(e.target.value);
  }

  function renderSwitch(param) {
    switch(param.length) {
      case 4:
        return `${param.substring(0, 1)},${param.substring(1, 2)}K`;
      case 5:
        return `${param.substring(0, 2)},${param.substring(2, 3)}K`;
      case 6:
        return `${param.substring(0, 3)},${param.substring(3, 4)}K`;
      case 7:
        return `${param.substring(0, 1)},${param.substring(1, 2)}M`;
      case 8:
        return `${param.substring(0, 2)},${param.substring(2, 3)}M`;
      case 9:
        return `${param.substring(0, 4)},${param.substring(3, 4)}M`;
      default:
        return `${param}`;
    }
  }

  function handleGeneratePdf(id, selected) {
    setSelectedItem(selected);

    const item = document.getElementsByClassName(`list-item-btn-${id}`)[0];
    const span = item.children[0];

    if (user.credit < 2) {
      message.error(`Yetersiz Bakiye`);
    } else {
      postGeneratePdf(id, network);
      if(reportDataLoading === false) {
        span.innerHTML = 'Hazırlanıyor...';
      } else {
        span.innerHTML = 'Rapor Hazır';
      }
    }
  }

  return (
    <Spin spinning={loading}>
      <div>
        <div className="title-heading">
          <h3 className="title mb-1">
            Influencer Arama
          </h3>
          <p className="para-desc text-muted">
            Instagram, YouTube veya TikTok'ta Influencer bulun.
          </p>
        </div>

        <div className={"gx-mt-5"}>
          <Radio.Group defaultValue="instagram" buttonStyle="solid" onChange={handleNetworkChange}>
            <Radio.Button value="instagram">Instagram</Radio.Button>
            <Radio.Button value="youtube">Youtube</Radio.Button>
            <Radio.Button value="tiktok">Tiktok</Radio.Button>
          </Radio.Group>
        </div>

        <Card className={"gx-mt-3"} title={
          <CardTitle title={"Influencer Filtresi"}
                     subTitle={"Aramanızı daraltmak için takipçi sayısı ve kitle filtreleri ile başlamayı deneyin ya da kullanıcı adına göre arama yapın."}/>}
              extra={null} style={{width: '100%'}}>
          <Card type="inner" title="Influencer Özellikleri" extra={null}>
            <div>
              <Row>
                <Col xs={24} md={8}>
                  <Row gutter={[10, 10]}>
                    <Col span={24}>
                      <label>
                        <b>Takipçi Sayısı:</b>
                      </label>
                    </Col>
                    <Col span={12}>
                      <Select allowClear placeholder={"min"} style={{width: '100%'}}
                              onChange={handleFollowerFromChange}>
                        <Option value="25000">25.000</Option>
                        <Option value="50000">50.000</Option>
                        <Option value="75000">75.000</Option>
                        <Option value="100000">100.000</Option>
                        <Option value="150000">150.000</Option>
                        <Option value="200000">200.000</Option>
                        <Option value="300000">300.000</Option>
                        <Option value="500000">500.000</Option>
                        <Option value="1000000">1.000.000</Option>
                      </Select>
                    </Col>
                    <Col span={12}>
                      <Select allowClear placeholder={"max"} style={{width: '100%'}}
                              onChange={handleFollowerToChange}>
                        <Option value="25000">25.000</Option>
                        <Option value="50000">50.000</Option>
                        <Option value="75000">75.000</Option>
                        <Option value="100000">100.000</Option>
                        <Option value="150000">150.000</Option>
                        <Option value="200000">200.000</Option>
                        <Option value="300000">300.000</Option>
                        <Option value="500000">500.000</Option>
                        <Option value="1000000">1.000.000</Option>
                        <Option value="1000000+">1.000.000+</Option>
                      </Select>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={4}>
                  <Row gutter={[10, 10]}>
                    <Col span={24}>
                      <label>
                        <b>Cinsiyet:</b>
                      </label>
                    </Col>
                    <Col xs={24} md={24}>
                      <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}} onChange={handleGenderChange}>
                        <Option value="FEMALE">Kadın</Option>
                        <Option value="MALE">Erkek</Option>
                      </Select>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={8}>
                  <Row gutter={[10, 10]}>
                    <Col span={24}>
                      <label>
                        <b>İlgi Alanları:</b>
                      </label>
                    </Col>
                    <Col xs={24} md={24}>
                      <Select
                        mode="multiple"
                        allowClear
                        style={{width: '100%'}}
                        placeholder="Seçiniz"
                        onChange={handleInterestsChange}
                      >
                        {interests}
                      </Select>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={4}>
                  <Row gutter={[10, 10]}>
                    <Col span={24}>
                      <label>
                        <b>Dil:</b>
                      </label>
                    </Col>
                    <Col xs={24} md={24}>
                      <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}}
                              onChange={handleLanguagesChange}>
                        {languages}
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className={"gx-mt-4"}>
              <Row>
                <Col xs={24} md={6}>
                  <Row gutter={[10, 10]}>
                    <Col span={24}>
                      <label>
                        <b>Etkileşim Oranı:
                          <Tooltip title="prompt text">
                            <InfoCircleOutlined/>
                          </Tooltip>
                        </b>
                      </label>
                    </Col>
                    <Col span={24}>
                      <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}}
                              onChange={handleEngagementRateChange}>
                        {rate}
                      </Select>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={6}>
                  <Row gutter={[10, 10]}>
                    <Col span={24}>
                      <label>
                        <b>Kontak Bilgileri:</b>
                      </label>
                    </Col>
                    <Col span={24}>
                      <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}}
                              onChange={handleContactDetailsChange}>
                        <Option value={false}>
                          Yok
                        </Option>
                        <Option value={true}>
                          Var
                        </Option>
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Card>
          <Card type="inner" title="Takipçi Özellikleri" extra={null} style={{marginBottom: 0}}>
            <div>
              <Row>
                <Col xs={24} md={4}>
                  <Row gutter={[10, 10]}>
                    <Col span={24}>
                      <label>
                        <b>Lokasyon:</b>
                      </label>
                    </Col>
                    <Col xs={24} md={24}>
                      <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}}
                              onChange={handleLanguagesChange}>
                        {languages}
                      </Select>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={4}>
                  <Row gutter={[10, 10]}>
                    <Col span={24}>
                      <label>
                        <b>Cinsiyet:</b>
                      </label>
                    </Col>
                    <Col xs={24} md={24}>
                      <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}} onChange={handleGenderChange}>
                        <Option value="FEMALE">Kadın</Option>
                        <Option value="MALE">Erkek</Option>
                      </Select>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={8}>
                  <Row gutter={[10, 10]}>
                    <Col span={24}>
                      <label>
                        <b>İlgi Alanları:</b>
                      </label>
                    </Col>
                    <Col xs={24} md={24}>
                      <Select
                        mode="multiple"
                        allowClear
                        style={{width: '100%'}}
                        placeholder="Seçiniz"
                        onChange={handleInterestsChange}
                      >
                        {interests}
                      </Select>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={4}>
                  <Row gutter={[10, 10]}>
                    <Col span={24}>
                      <label>
                        <b>Dil:</b>
                      </label>
                    </Col>
                    <Col xs={24} md={24}>
                      <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}}
                              onChange={handleLanguagesChange}>
                        {languages}
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Card>
          <Row>
            <Col xs={24} sm={24}>
              <div style={{textAlign: 'right'}} className={"gx-mt-3 gx-mb-3"}>
                <Button className="btn btn-primary" onClick={handleFilter} disabled={loading} loading={loading}>
                  {user.credit < 1 ? 'Yetersiz Bakiye' : 'Filtrele'}
                </Button>
              </div>
            </Col>
          </Row>
          <Card type="inner" title="Kullanıcı Adına Göre Arama" extra={null}>
            <div>
              <Row>
                <Col xs={24} md={24}>
                  <Row gutter={[10, 10]}>
                    <Col span={24}>
                      <Input
                        value={value}
                        placeholder="Kullanıcı Adı İle Arama Yapabilirsiniz. ( @username )"
                        onChange={handleValue}
                        style={{
                          width: '100%',
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col xs={24} sm={24}>
                  <div style={{textAlign: 'right'}} className={"gx-mt-3"} onClick={handleFilterUserName}>
                    <Button className="btn btn-primary">
                      Arama
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Card>
        <div>
          {
            showSorting &&
            <div className={"list-header-item"}>
              <Row>
                <Col span={24}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 30,
                    marginTop: 10
                  }}>
                    <SortDescendingOutlined/>
                    <span style={{marginLeft: 5}}>Sıralama: </span>
                    <Select defaultValue={"1"} placeholder={"Sıralama"} style={{width: 150, marginLeft: 5}}
                            onChange={handleSortChange}>
                      <Option value="1">Seçiniz</Option>
                      <Option value="2">Takipçi Sayısı</Option>
                      <Option value="3">Etkileşim Oranı</Option>
                    </Select>
                    <hr/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={9}>
                  <p style={{marginBottom: 0}}><b>{total}</b> adet influencer bulundu.</p>
                </Col>
                <Col xs={12} md={4}>
                  <p style={{marginBottom: 0}}>Takipçi Oranı</p>
                </Col>
                <Col xs={12} md={11}>
                  <p style={{marginBottom: 0}}>Etkileşim (Etkileşim Oranı %)</p>
                </Col>
              </Row>
            </div>
          }
          {
            searchList &&
            <div>
              <Row>
                <Col span={24}>
                  <List
                    className="list-item gx-mt-2"
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={searchList}
                    column={4}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Button className={`btn btn-secondary list-item-btn-${item.userId}`} onClick={() => {
                            handleGeneratePdf(item.userId, item);
                          }}>
                            <span>Rapor Al (2 Kredi)</span>
                          </Button>] }

                        className={`list-item-${item.userId}`}
                      >
                        <Skeleton loading={loading}>
                          <Row style={{width: '100%'}} gutter={[0, 0]}>
                            <Col md={12}>
                              <List.Item.Meta
                                className={"list-meta-item"}
                                avatar={<Avatar size={50} src={`${item.profile.picture}`}/>}
                                title={<h6 className={"gx-mb-0"}>{item.profile.fullname}</h6>}
                                description={<a href={`${item.profile.url}`} target={"_blank"} rel="noreferrer">@{item.profile.username}</a>}
                              />
                            </Col>
                            <Col md={5}>
                              <List.Item.Meta
                                title={<h5 className={"gx-mb-0"}>
                                  {renderSwitch(item.profile.followers.toString())}
                                </h5>}
                                description={
                                  <p className="text-muted" style={{fontSize: 14, marginBottom: 0}}>
                                    Takipçi
                                  </p>
                                }
                              />
                            </Col>
                            <Col md={7}>
                              <List.Item.Meta
                                title={<h5 className={"gx-mb-0"}>
                                  {item.profile.engagements.toString().substring(0, 3)}k
                                  ({parseFloat(parseFloat(item.profile.engagementRate) * 100).toFixed(2)} %)
                                </h5>}
                                description={
                                  <p className="gx-text-grey" style={{fontSize: 14, marginBottom: 0}}>
                                    Etkileşimler ve Oranı
                                  </p>
                                }
                              />
                            </Col>
                          </Row>
                        </Skeleton>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </div>


          }
          {/**
           searchList && searchList.map((item, index) => {
              return (
                <CardList key={item.userId}
                          url={item.profile.url}
                          avatar={item.profile.picture}
                          name={item.profile.fullname}
                          userName={item.profile.username}
                          follower={item.profile.followers.toString()}
                          engagement={`${item.profile.engagements}`}
                          engagementRate={parseFloat(item.profile.engagementRate)}
                          pdfUrl={'/'}
                          reportDataLoading={reportDataLoading}
                          data={reportData}
                          credit={user.credit}
                          userId={item.userId}
                          network={network}
                          documentFile={<PdfDocument data={reportData}/>}
                />
              )
            })
           **/}
          {
            directs && directs.map((item, index) => {
              return (
                <CardList key={index}
                          url={item.profile.url}
                          avatar={item.profile.picture}
                          name={item.profile.fullname}
                          userName={item.profile.username}
                          follower={item.profile.followers.toString()}
                          engagement={`${item.profile.engagements}`}
                          engagementRate={parseFloat(item.profile.engagementRate)}
                          pdfUrl={'/'}
                          reportDataLoading={reportDataLoading}
                          data={reportData}
                          credit={user.credit}
                          userId={item.userId}
                          network={network}
                          documentFile={<PdfDocument data={reportData}/>}
                />
              )
            })

          }
          {searchList === {} &&
          <h3>Lütfen Filtreleme Seçeneğini kullanın!</h3>
          }
        </div>
        {showSorting &&
        <Pagination current={page} pageSize={50} total={total} onChange={(value) => {
          setPage(value);
          handlePagination();
        }} showSizeChanger={false}
                    style={{marginTop: 15}}/>}
      </div>
    </Spin>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.list.loading,
    searchList: state.list.searchList,
    reportData: state.list.reportData,
    directs: state.list.directs,
    reportDataLoading: state.list.reportDataLoading,
    showSorting: state.list.showSorting,
    reportId: state.list.reportId,
    total: state.list.total,
    error: state.list.error,
    user: state.user.user
  }
}

export default connect(mapStateToProps, {
  postSearchAdvanced,
  postSearchUserName,
  postPagination,
  postGeneratePdf,
  isLoggedIn
})(SamplePage);

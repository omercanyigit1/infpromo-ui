import React, {useState, useEffect} from "react";
import {
  Radio,
  Card,
  Select,
  Row,
  Col,
  Tooltip,
  Input,
  Spin,
  Button,
  message,
  Pagination,
  List,
  Avatar,
  Skeleton,
  Collapse,
  Space,
  Popconfirm
} from 'antd';
import {InfoCircleOutlined, SortDescendingOutlined} from '@ant-design/icons';
import debounce from 'lodash/debounce';
import {connect} from 'react-redux';
import {useHistory, Link} from 'react-router-dom';
import {
  postSearchAdvanced,
  postPagination,
  postSearchUserName,
  isLoggedIn
} from "../../appRedux/actions";
import data from './../../constants/data.json';

const {Option} = Select;

const {Panel} = Collapse;

const rate = [];
for (let i = 1; i < 21; i++) {
  rate.push(<Option key={i.toString(21) + i} value={i}>≥ {i} %</Option>);
}

const interests = [];
for (let i = 0; i < data.interests.length; i++) {
  interests.push(<Option key={data.interests[i].id} value={data.interests[i].id}>{data.interests[i].name}</Option>);
}

const languages = [];
for (let i = 0; i < data.languages.length; i++) {
  languages.push(<Option key={data.languages[i].code} value={data.languages[i].code}>{data.languages[i].name}</Option>);
}

const audienceAge = [];
for (let i = 0; i < data.audienceAge.length; i++) {
  audienceAge.push(<Option key={data.audienceAge[i]} value={data.audienceAge[i]}>{data.audienceAge[i]}</Option>);
}

const audienceInterests = [];
for (let i = 0; i < data.audienceInterests.length; i++) {
  audienceInterests.push(<Option key={data.audienceInterests[i].id}
                                 value={data.audienceInterests[i].id}>{data.audienceInterests[i].name}</Option>);
}

const audienceLanguages = [];
for (let i = 0; i < data.audienceLanguages.length; i++) {
  audienceLanguages.push(<Option key={data.audienceLanguages[i].code}
                                 value={data.audienceLanguages[i].code}>{data.audienceLanguages[i].name}</Option>);
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
  let history = useHistory();

  const [value, setValue] = useState('');
  const [network, setNetwork] = useState('instagram');
  const [followersFrom, setFollowersFrom] = useState(20000);
  const [followersTo, setFollowersTo] = useState(10000000);
  const [viewsFrom, setViewsFrom] = useState(20000);
  const [viewsTo, setViewsTo] = useState(10000000);
  const [gender, setGender] = useState('');
  const [sortName, setSortName] = useState('followers');
  const [interest, setInterests] = useState([]);
  const [relevance, setRelevance] = useState([]);
  const [language, setLanguages] = useState('tr');
  const [engagementRate, setEngagementRate] = useState(0);
  const [contactDetails, setContactDetails] = useState(false);
  const [hasYoutube, setHasYoutube] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [audienceGender, setAudienceGender] = useState('')
  const [audienceInterestsState, setAudienceInterests] = useState('')
  const [audienceLanguagesState, setAudienceLanguages] = useState('')
  const [audienceAgeState, setAudienceAge] = useState('')

  const {
    searchList,
    postSearchAdvanced,
    postPagination,
    postSearchUserName,
    directs,
    loading,
    total,
    showSorting,
    reportId,
    user
  } = props;

  useEffect(() => {

  }, [total, directs, showLoading, reportId]);

  function handleNetworkChange(e) {
    setNetwork(e.target.value);
  }

  function handleFollowerFromChange(value) {
    setFollowersFrom(value);
  }

  function handleFollowerToChange(value) {
    setFollowersTo(value);
  }

  function handleViewsFromChange(value) {
    setViewsFrom(value);
  }

  function handleViewsToChange(value) {
    setViewsTo(value);
  }

  function handleGenderChange(value) {
    setGender(value);
  }

  function handleInterestsChange(value) {
    setInterests(value);
  }

  function handleLanguagesChange(value) {
    setLanguages(value);
  }

  function handleEngagementRateChange(value) {
    setEngagementRate(value);
  }

  function handleContactDetailsChange(value) {
    setContactDetails(value);
  }

  function handleHasYoutubeChange(value) {
    setHasYoutube(value);
  }

  function handleAudienceGenderChange(value) {
    setAudienceGender(value);
  }

  function handleAudienceInterestsChange(value) {
    setAudienceInterests(value);
  }

  function handleAudienceLanguagesChange(value) {
    setAudienceLanguages(value);
  }

  function handleAudienceAgeChange(value) {
    setAudienceAge(value);
  }

  function handleSortChange(value) {
    setSortName(value);
  }

  function handleInstagram() {
    let data = {
      "sort": {
        "field": `${sortName}`,
        "direction": "desc"
      },
      "page": page - 1,
      "filter": {
        "influencer": {
          "location": [174737],
          "followers": {
            "min": parseInt(followersFrom),
            "max": parseInt(followersTo)
          },
          "interests": interest,
          "hasContactDetails": contactDetails,
          "hasYoutube": hasYoutube,
          "engagementRate": parseInt(engagementRate),
          "language": language,
          "gender": gender
        },
        "audience": {
          "age": audienceAgeState,
          "gender": audienceGender,
          "interests": audienceInterestsState,
          "language": audienceLanguagesState
        }
      }
    }

    if (user.credit < 1) {
      message.error(`Yetersiz Bakiye`);
    } else {
      postSearchAdvanced(data, network);
    }
  }

  function handleYoutube() {
    let data = {
      "sort": {
        "field": `${sortName}`,
        "direction": "desc"
      },
      "page": page - 1,
      "filter": {
        "influencer": {
          "location": [174737],
          "followers": {
            "min": parseInt(followersFrom),
            "max": parseInt(followersTo)
          },
          "hasContactDetails": contactDetails,
          "engagementRate": parseInt(engagementRate),
          "language": language,
          "gender": gender,
          "views": {
            "min": parseInt(viewsFrom),
            "max": parseInt(viewsTo)
          },
        },
        "audience": {
          "age": audienceAgeState,
          "gender": audienceGender,
          "language": audienceLanguagesState
        }
      }
    }

    if (user.credit < 1) {
      message.error(`Yetersiz Bakiye`);
    } else {
      postSearchAdvanced(data, network);
    }
  }

  function handleTiktok() {
    let data = {
      "sort": {
        "field": `${sortName}`,
        "direction": "desc"
      },
      "page": page - 1,
      "filter": {
        "influencer": {
          "location": [174737],
          "followers": {
            "min": parseInt(followersFrom),
            "max": parseInt(followersTo)
          },
          "hasContactDetails": contactDetails,
          "engagementRate": parseInt(engagementRate),
          "language": language,
          "gender": gender,
          "views": {
            "min": parseInt(viewsFrom),
            "max": parseInt(viewsTo)
          },
        },
        "audience": {
          "age": audienceAgeState,
          "gender": audienceGender,
          "language": audienceLanguagesState
        }
      }
    }

    if (user.credit < 1) {
      message.error(`Yetersiz Bakiye`);
    } else {
      postSearchAdvanced(data, network);
    }
  }

  function handleFilter() {

    switch (network) {
      case 'instagram':
        return handleInstagram();
      case 'youtube':
        return handleYoutube();
      case 'tiktok':
        return handleTiktok();
      default:
        return handleInstagram();
    }
  }

  function handleFilterUserName() {

    let data = {
      "sort": {
        "field": `${sortName}`,
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

  }

  function handleValue(e) {
    setValue(e.target.value);
  }

  function renderSwitch(param) {
    switch (param.length) {
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

        <Space direction="vertical" style={{width: '100%'}} className={"gx-mt-3"}>
          <Collapse collapsible="header" defaultActiveKey={['1']}>
            <Panel header={
              <CardTitle title={"Influencer Filtresi"}
                         subTitle={"Aramanızı daraltmak için takipçi sayısı ve kitle filtreleri ile başlamayı deneyin ya da kullanıcı adına göre arama yapın."}/>}
                   key="1">
              <Card type="inner" title={"Influencer Özellikleri"} extra={null} style={{marginTop: 10}}>
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
                    {network !== 'instagram' &&
                    <Col xs={24} md={8}>
                      <Row gutter={[10, 10]}>
                        <Col span={24}>
                          <label>
                            <b>Görüntülenme Sayısı:</b>
                          </label>
                        </Col>
                        <Col span={12}>
                          <Select allowClear placeholder={"min"} style={{width: '100%'}}
                                  onChange={handleViewsFromChange}>
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
                                  onChange={handleViewsToChange}>
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
                    }
                    <Col xs={24} md={4}>
                      <Row gutter={[10, 10]}>
                        <Col span={24}>
                          <label>
                            <b>Cinsiyet:</b>
                          </label>
                        </Col>
                        <Col xs={24} md={24}>
                          <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}}
                                  onChange={handleGenderChange}>
                            <Option value="FEMALE">Kadın</Option>
                            <Option value="MALE">Erkek</Option>
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                    {network === 'instagram' &&
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
                    }
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
                    {network === 'instagram' &&
                    <Col xs={24} md={6}>
                      <Row gutter={[10, 10]}>
                        <Col span={24}>
                          <label>
                            <b>Youtube Hesabı:</b>
                          </label>
                        </Col>
                        <Col span={24}>
                          <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}}
                                  onChange={handleHasYoutubeChange}>
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
                    }
                  </Row>
                </div>
              </Card>
              <Card type="inner" title="Takipçi Özellkleri" extra={null} style={{marginBottom: 0}}>
                <div>
                  <Row>
                    <Col xs={24} md={4}>
                      <Row gutter={[10, 10]}>
                        <Col span={24}>
                          <label>
                            <b>Cinsiyet:</b>
                          </label>
                        </Col>
                        <Col xs={24} md={24}>
                          <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}}
                                  onChange={handleAudienceGenderChange}>
                            <Option value="FEMALE">Kadın</Option>
                            <Option value="MALE">Erkek</Option>
                          </Select>
                        </Col>
                      </Row>
                    </Col>

                    <Col xs={24} md={4}>
                      <Row gutter={[10, 10]}>
                        <Col span={24}>
                          <label>
                            <b>Yaş Aralığı:</b>
                          </label>
                        </Col>
                        <Col xs={24} md={24}>
                          <Select
                            mode="multiple"
                            allowClear
                            style={{width: '100%'}}
                            placeholder="Seçiniz"
                            onChange={handleAudienceAgeChange}
                          >
                            {audienceAge}
                          </Select>
                        </Col>
                      </Row>
                    </Col>

                    {network === 'instagram' &&
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
                            onChange={handleAudienceInterestsChange}
                          >
                            {audienceInterests}
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                    }
                    <Col xs={24} md={4}>
                      <Row gutter={[10, 10]}>
                        <Col span={24}>
                          <label>
                            <b>Dil:</b>
                          </label>
                        </Col>
                        <Col xs={24} md={24}>
                          <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}}
                                  onChange={handleAudienceLanguagesChange}>
                            {audienceLanguages}
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

                  <Row justify={"end"}>
                    <Col xs={24} sm={3}>
                      <div style={{textAlign: 'right'}} className={"gx-mt-3"} onClick={handleFilterUserName}>
                        <Button className="btn btn-primary">
                          Arama
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Panel>
          </Collapse>
        </Space>
        <div>
          {
            showSorting &&
            <div className={"list-header-item"}>
              <Row align={"middle"}>
                <Col xs={24} md={24}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 20
                  }}>
                    <SortDescendingOutlined/>
                    <span style={{marginLeft: 5}}>Sıralama: </span>
                    <Select defaultValue={"followers"} placeholder={"Sıralama"} style={{width: 150, marginLeft: 5}}
                            onChange={handleSortChange}>
                      <Option value="followers">Takipçi Sayısı</Option>
                      <Option value="engagements">Etkileşim</Option>
                      <Option value="engagementsRate">Etkileşim Oranı</Option>
                    </Select>
                    <hr/>
                  </div>
                </Col>
                <Col xs={24} md={24}>
                  <p style={{marginBottom: 0, textAlign: "left"}}><b>{total}</b> adet influencer bulundu.</p>
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
                    locale={{emptyText: 'Veri Yok'}}
                    bordered={true}
                    size={'large'}
                    pagination={{
                      onChange: page => {
                        setPage(page);
                        handleFilter();
                      },
                      pageSize: 15,
                      total: total,
                    }}
                    dataSource={searchList}
                    column={4}
                    renderItem={item => (
                      <List.Item
                        key={`list-${item.userId}`}
                        className={`list-item-${item.userId}`}
                        actions={[
                          <Link to={`/detail/${network}/${item.userId}`} target={"_blank"} className={`btn btn-secondary list-item-btn-${item.userId}`}>
                            <span>Detay</span>{" "} <span style={{fontSize: 13, marginLeft: 5}}>{" "} (2 kredi)</span>
                          </Link>]}>
                        <Skeleton loading={loading}>
                          <Row style={{width: '100%'}} gutter={[0, 0]}>
                            <Col xs={24} sm={12} md={12}>
                              <List.Item.Meta
                                className={"list-meta-item"}
                                avatar={<Avatar size={50} src={`${item.profile.picture}`}/>}
                                title={<p className={"gx-mb-0 list-item-header"}>{item.profile.fullname}</p>}
                                description={<a href={`${item.profile.url}`} target={"_blank"}
                                                rel="noreferrer">@{item.profile.username}</a>}
                              />
                            </Col>
                            <Col xs={12} sm={5} md={5}>
                              <List.Item.Meta
                                className={"gx-text-center list-mobile-margin"}
                                title={<p className={"gx-mb-0 list-item-header"}>
                                  {renderSwitch(item.profile.followers.toString())}
                                </p>}
                                description={
                                  <p className="text-muted" style={{fontSize: 14, marginBottom: 0}}>
                                    Takipçi
                                  </p>
                                }
                              />
                            </Col>
                            <Col xs={12} sm={7} md={7}>
                              <List.Item.Meta
                                className={"list-mobile-margin"}
                                title={<p className={"gx-mb-0 list-item-header"}>
                                  {item.profile.engagements.toString().substring(0, 3)}k
                                  ({parseFloat(parseFloat(item.profile.engagementRate) * 100).toFixed(2)} %)
                                </p>}
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
          {
            directs && directs.map((item, index) => {
              return (
                <List
                  className="list-item gx-mt-2"
                  loading={loading}
                  itemLayout="horizontal"
                  locale={{emptyText: 'Veri Yok'}}
                  bordered={true}
                  size={'large'}
                  dataSource={searchList}
                  column={4}
                  renderItem={item => (
                    <List.Item
                      key={`list-${item.userId}`}
                      className={`list-item-${item.userId}`}
                      actions={[
                        <Link href={`/detail/${network}/${item.userId}`} target={"_blank"} className={`btn btn-secondary list-item-btn-${item.userId}`}>
                          <span>Detay</span>{" "} <span style={{fontSize: 13, marginLeft: 5}}>{" "} (1.5 kredi)</span>
                        </Link>]}>
                      <Skeleton loading={loading}>
                        <Row style={{width: '100%'}} gutter={[0, 0]}>
                          <Col xs={24} sm={12} md={12}>
                            <List.Item.Meta
                              className={"list-meta-item"}
                              avatar={<Avatar size={50} src={`${item.profile.picture}`}/>}
                              title={<p className={"gx-mb-0 list-item-header"}>{item.profile.fullname}</p>}
                              description={<a href={`${item.profile.url}`} target={"_blank"}
                                              rel="noreferrer">@{item.profile.username}</a>}
                            />
                          </Col>
                          <Col xs={12} sm={5} md={5}>
                            <List.Item.Meta
                              className={"gx-text-center list-mobile-margin"}
                              title={<p className={"gx-mb-0 list-item-header"}>
                                {renderSwitch(item.profile.followers.toString())}
                              </p>}
                              description={
                                <p className="text-muted" style={{fontSize: 14, marginBottom: 0}}>
                                  Takipçi
                                </p>
                              }
                            />
                          </Col>
                          <Col xs={12} sm={7} md={7}>
                            <List.Item.Meta
                              className={"list-mobile-margin"}
                              title={<p className={"gx-mb-0 list-item-header"}>
                                {item.profile.engagements.toString().substring(0, 3)}k
                                ({parseFloat(parseFloat(item.profile.engagementRate) * 100).toFixed(2)} %)
                              </p>}
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
              )
            })

          }
          {searchList === {} &&
          <h3>Lütfen Filtreleme Seçeneğini kullanın!</h3>
          }
        </div>
      </div>
    </Spin>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.list.loading,
    searchList: state.list.searchList,
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
  isLoggedIn
})(SamplePage);

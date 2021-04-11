import React, {useEffect, useState} from 'react';
import {postGeneratePdf, isLoggedIn} from "../../appRedux/actions";
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Row, Col, Spin, Result, Card, Avatar, Statistic, Tooltip, Progress, Tag} from 'antd';
import {
  InstagramOutlined,
  YoutubeOutlined,
  UserOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  FundOutlined,
  InfoCircleOutlined,
  UsergroupDeleteOutlined,
  HeartFilled,
  CommentOutlined,
  EyeOutlined,
  RetweetOutlined
} from "@ant-design/icons";
import _ from 'lodash'
import moment from 'moment';

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
      return `${param.substring(0, 3)},${param.substring(3, 4)}M`;
    default:
      return `${param}`;
  }
}

const DetailPage = (props) => {
  let avgComments, avgLikes, avgViews;
  let params = useParams();
  const id = params.id;
  const network = params.network;
  const [avgLikesState, setAvgLikesState] = useState(0);
  const [avgCommentsState, setAvgCommentsState] = useState(0);
  const [avgViewsState, setAvgViewsState] = useState(0);

  const {postGeneratePdf, reportData, loading, user} = props;

  useEffect(() => {

    if(_.isEmpty(user)) {
      postGeneratePdf(id, network);
    }

  }, [postGeneratePdf])

  if (reportData) {

    if(network === 'youtube' || network === 'tiktok') {
      avgLikes = parseFloat(`${(reportData.profile.recentPosts.reduce((totalLikes, item) => totalLikes + item.likes, 0) / 10).toFixed(0)}`);
      avgViews = parseFloat(`${(reportData.profile.recentPosts.reduce((totalViews, item) => totalViews + item.views, 0) / 10).toFixed(0)}`);
      avgComments = parseFloat(`${(reportData.profile.recentPosts.reduce((totalComments, item) => totalComments + item.comments, 0) / 10).toFixed(0)}`);
    }

    if (params.id !== reportData.profile.userId) {
      return (
        <Result
          status="error"
          title="Hatalı Sonuç"
          subTitle="Aradığınız profil bulunamadı. Tekrar arama yaparak doğru profili seçebilirsiniz."
          extra={null}
        >
        </Result>
      )
    }
  }

  return (
    <Spin spinning={loading}>
      {reportData &&
      <div>
        <div className="title-heading">
          <h3 className="title mb-1">
            Profil Detayı
          </h3>
          <p className="para-desc text-muted">
            Seçtiğiniz profilin detayını buradan görebilirsiniz.
          </p>
        </div>
        {network === 'instagram' &&
        <Card className={"gx-mt-3"} type="inner" title={null} extra={null} style={{marginTop: 10}}>
          <div>
            <Row align={"middle"} justify={"center"}>
              <Col xs={24} md={22}>
                <div className={"gx-text-center"}>
                  <Avatar size={100} src={`${reportData.profile.profile.picture}`}/>
                  <h4>{reportData.profile.profile.fullname}</h4>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <InstagramOutlined size={40}/>
                    <a href={`${reportData.profile.profile.url}`} target={"_blank"}
                       style={{marginLeft: 5, fontSize: 15}}>
                      <span>{reportData.profile.profile.username}</span>
                    </a>
                  </div>
                  <div className={"gx-mt-5"}>
                    <Row gutter={[10, 10]}>
                      <Col xs={24} md={8}>
                        <div className={"box-item"}>
                          <UserOutlined style={{fontSize: 25, color: '#003366'}}/>
                          <h4 style={{marginTop: 10}}>{renderSwitch(reportData.profile.profile.followers.toString())}</h4>
                          <p style={{marginBottom: 0}}>Takipçi</p>
                          {
                            reportData.profile.stats.followers.compared > 0 &&
                            <Statistic
                              title={null}
                              value={parseFloat(parseFloat(reportData.profile.stats.followers.compared) * 100).toFixed(2)}
                              precision={2}
                              valueStyle={{color: '#3f8600'}}
                              prefix={<CaretUpOutlined/>}
                              suffix={
                                <div style={{display: 'flex', alignItems: "center"}}>
                                  <span>% </span> {" "}
                                  <Tooltip title="prompt text">
                                    <InfoCircleOutlined/>
                                  </Tooltip>
                                </div>
                              }
                            />
                          }
                          {
                            reportData.profile.stats.followers.compared < 0 &&
                            <Statistic
                              title={null}
                              value={parseFloat(parseFloat(reportData.profile.stats.followers.compared) * 100).toFixed(2)}
                              precision={2}
                              valueStyle={{color: '#cf1322'}}
                              prefix={<CaretDownOutlined/>}
                              suffix={
                                <div style={{display: 'flex', alignItems: "center"}}>
                                  <span>% </span> {" "}
                                  <Tooltip title="prompt text">
                                    <InfoCircleOutlined/>
                                  </Tooltip>
                                </div>
                              }
                            />
                          }
                        </div>
                      </Col>
                      <Col xs={24} md={8}>
                        <div className={"box-item"}>
                          <HeartFilled style={{fontSize: 25, color: 'rgb(241, 133, 131)'}}/>
                          <h4 style={{marginTop: 10}}>{reportData.profile.profile.engagements.toString().substring(0, 3)} k</h4>
                          <p style={{marginBottom: 0}}>Toplam Etkilesim</p>
                          {
                            reportData.profile.stats.avgLikes.compared > 0 &&
                            <Statistic
                              title={null}
                              value={parseFloat(parseFloat(reportData.profile.stats.avgLikes.compared) * 100).toFixed(2)}
                              precision={2}
                              valueStyle={{color: '#3f8600'}}
                              prefix={<CaretUpOutlined/>}
                              suffix={
                                <div style={{display: 'flex', alignItems: "center"}}>
                                  <span>% </span> {" "}
                                  <Tooltip title="prompt text">
                                    <InfoCircleOutlined/>
                                  </Tooltip>
                                </div>
                              }
                            />
                          }
                          {
                            reportData.profile.stats.avgLikes.compared < 0 &&
                            <Statistic
                              title={null}
                              value={parseFloat(parseFloat(reportData.profile.stats.avgLikes.compared) * 100).toFixed(2)}
                              precision={2}
                              valueStyle={{color: '#cf1322'}}
                              prefix={<CaretDownOutlined/>}
                              suffix={
                                <div style={{display: 'flex', alignItems: "center"}}>
                                  <span>% </span> {" "}
                                  <Tooltip title="prompt text">
                                    <InfoCircleOutlined/>
                                  </Tooltip>
                                </div>
                              }
                            />
                          }
                        </div>
                      </Col>
                      <Col xs={24} md={8}>
                        <div className={"box-item"}>
                          <FundOutlined style={{fontSize: 25, color: 'rgb(97, 51, 156)'}}/>
                          <h4 style={{marginTop: 10}}>{parseFloat(parseFloat(reportData.profile.profile.engagementRate) * 100).toFixed(2)} %</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Etkileşim Oranı</p>
                            <Tooltip title="prompt text">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row gutter={[10, 10]}>
                      <Col xs={24} md={24}>
                        <p className={"detail-title-item"}>Takipçiler Hakkında</p>
                      </Col>
                      <Col xs={24} md={12}>
                        <div className={"box-item"}>
                          <UsergroupDeleteOutlined style={{fontSize: 25, color: 'rgb(250, 143, 56)'}}/>
                          <h4>{parseFloat(100 - (parseFloat(reportData.profile.audience.credibility) * 100).toFixed(2)).toFixed(2)} %</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Fake Takipçiler</p>
                            <Tooltip title="prompt text">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                        <div className={"gx-mt-1 box-item"}>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p className={"box-item-title"} style={{marginRight: 5}}>Takipçi Cinsiyeti</p>
                            <Tooltip title="prompt text">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                          <div style={{display: "flex", alignItems: 'center', flexDirection: 'column', width: '60%', margin: '10px auto'}}>
                            <span style={{width: '100%', marginBottom: 15}}>Erkek: <Progress
                              percent={parseFloat(reportData.profile.audience.genders[0].weight * 100).toFixed(2)}
                              strokeColor={`rgb(54, 162, 235)`}/></span>
                            <span style={{width: '100%', marginBottom: 15}}>Kadın: <Progress
                              percent={parseFloat(reportData.profile.audience.genders[1].weight * 100).toFixed(2)}
                              strokeColor={`rgb(255, 99, 132)`}/></span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={12}>
                        <div className={"box-item"} style={{textAlign: "left"}}>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginBottom: 15,
                            marginTop: 10
                          }}>
                            <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>Takipçi Lokasyonları</p>
                            <Tooltip title="prompt text">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                          {(reportData.profile.audience.geoCountries).slice(0, 4).map((item, index) => {
                            return (
                              <div key={`item-geo-${index}`} style={{width: '80%', marginBottom: 15}}>
                                <span>{item.name}</span>
                                <Progress percent={parseFloat(item.weight * 100).toFixed(2)}/>
                              </div>
                            )
                          })}
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginBottom: 20
                          }}>
                            <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>Top 5 Şehir</p>
                          </div>
                          {(reportData.profile.audience.geoCities).slice(0, 5).map((item, index) => {
                            return (
                              <div key={`au-city-${index}`} style={{width: '80%', marginBottom: 15}}>
                                <span>{index + 1}. </span><span>{item.name} </span>
                              </div>
                            )
                          })}
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginBottom: 25
                          }}>
                            <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Yaş ve Cinsiyet İstatistikleri</p>
                            <Tooltip title="Takipçilerin yaş ve cinsiyet grafikleri">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                          <Row>
                            {(reportData.profile.audience.gendersPerAge).map((item, index) => {
                              return (
                                <Col key={`per-age-${index}`} xs={24} md={8}>
                                  <div className={"box-item"} style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    marginBottom: 10,
                                    paddingTop: 20,
                                  }}>
                                    <p style={{marginBottom: 0}}>{item.code}</p>
                                    <div style={{display: "flex", alignItems: 'center', flexDirection: 'column'}}>
                                      <span>Erkek: <Progress width={80} type="circle"
                                                             percent={parseFloat(item.male * 100).toFixed(2)}
                                                             strokeColor={`rgb(54, 162, 235)`}/></span>
                                      <span>Kadın: <Progress width={80} type="circle"
                                                             percent={parseFloat(item.female * 100).toFixed(2)}
                                                             strokeColor={`rgb(255, 99, 132)`}/></span>
                                    </div>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Looklikers</p>
                          <Tooltip title="Seçtiğiniz influencer ile aynı faaliyet alanlarında bulunan hesaplar">
                            <InfoCircleOutlined/>
                          </Tooltip>
                        </div>
                        <div className={"box-item"} style={{padding: 20}}>
                          <Row>
                            {reportData.profile.audience.audienceLookalikes && (reportData.profile.audience.audienceLookalikes).map((item, index) => {
                              return (
                                <Col key={`per-look-${index}`} xs={24} md={8}>
                                  <div style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    marginBottom: 10
                                  }}>
                                    <a href={`https://instagram.com/${item.username}`} target={"_blank"} style={{
                                      display: "flex",
                                      alignItems: 'center',
                                      justifyContent: 'flex-start',
                                      width: "100%",
                                      paddingBottom: 10
                                    }}>
                                      <Avatar src={`${item.picture}`} size={25}/>
                                      <span style={{marginLeft: 10}}> {item.username}</span>
                                    </a>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Takipçilerin ilgi alanları</p>
                          <Tooltip title="Influencer' ı takip eden takipçilerin genellikle ilgilendikleri kategoriler">
                            <InfoCircleOutlined/>
                          </Tooltip>
                        </div>

                        <div className={"box-item"} style={{padding: 30}}>
                          <Row>
                            {(reportData.profile.audience.interests).map((item, index) => {
                              return (
                                <Col key={`per-interests-${index}`} xs={24} sm={12} md={8}>
                                  <div style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    flexDirection: "column",
                                    marginBottom: 10,
                                    textAlign: 'left'
                                  }}>
                                    <span style={{width: "100%", fontSize: '.9rem'}}>{item.name}</span>
                                    <Progress percent={parseFloat(item.weight * 100).toFixed(2)}/>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Popüler hastagler (#)</p>
                          <Tooltip title="Influencer 'ın kullandığı populer hastagler">
                            <InfoCircleOutlined/>
                          </Tooltip>
                        </div>
                        <div className={"box-item"} style={{padding: 10}}>
                          <Row style={{width: 'calc(100% - 32px)'}}>
                            {reportData.profile.hashtags && (reportData.profile.hashtags).map((item, index) => {
                              return (
                                <Col key={`has-tags-${index}`} xs={24} md={8}>
                                  <div style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    flexDirection: "column",
                                    marginBottom: 10,
                                    textAlign: 'left'
                                  }}>
                                    <div style={{textAlign: "left", width: '100%'}}>
                                      <Tag color={"#108ee9"}>#{item.tag}</Tag>
                                    </div>
                                    <Progress percent={parseFloat(item.weight * 100).toFixed(2)}/>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>En çok beğenilen postlar </p>
                        </div>
                        <div>
                          <Row gutter={[10, 10]}>
                            {(reportData.profile.popularPosts).map((item, index) => {
                              return (
                                <Col key={`posts-${index}`} xs={12} md={6}>
                                  <div
                                    className={"box-item"}
                                    style={{
                                      display: "flex",
                                      alignItems: 'center',
                                      justifyContent: 'flex-start',
                                      flexDirection: "column",
                                      textAlign: 'left',
                                      marginBottom: 5,
                                    }}>
                                    <p style={{fontSize: 13, marginBottom: 10}}>Tarih: {moment(item.created).format('ll')}</p>
                                    <a href={`${item.url}`}
                                       target={"_blank"}
                                       style={{
                                         backgroundImage: `url(${item.thumbnail})`,
                                         display: 'block',
                                         height: '8rem',
                                         width: '100%',
                                         backgroundColor: '#000',
                                         backgroundPosition: '50%',
                                         backgroundSize: 'cover'
                                       }}
                                    >

                                    </a>
                                    <p style={{marginTop: 10}}>
                                      <span style={{display: 'flex', alignItems: 'center'}}>
                                        <HeartFilled style={{color: 'rgb(241, 133, 131)'}}/>
                                        <span style={{marginLeft: 5}}>{renderSwitch(item.likes.toString())}</span>
                                      </span>
                                    </p>
                                    <p>
                                      <span style={{display: 'flex', alignItems: 'center'}}>
                                        <CommentOutlined style={{color: '#4aabed'}} />
                                        <span style={{marginLeft: 5}}>{renderSwitch(item.comments.toString())}</span>
                                      </span>
                                    </p>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
        }
        {network === 'youtube' &&
        <Card className={"gx-mt-3"} type="inner" title={null} extra={null} style={{marginTop: 10}}>
          <div>
            <Row align={"middle"} justify={"center"}>
              <Col xs={24} md={22}>
                <div className={"gx-text-center"}>
                  <Avatar size={100} src={`${reportData.profile.profile.picture}`}/>
                  <h4>{reportData.profile.profile.fullname}</h4>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <YoutubeOutlined size={40}/>
                    <a href={`${reportData.profile.profile.url}`} target={"_blank"}
                       style={{marginLeft: 5, fontSize: 15}}>
                      <span>{reportData.profile.profile.fullname}</span>
                    </a>
                  </div>
                  <div className={"gx-mt-5"}>
                    <Row gutter={[10, 10]}>
                      <Col xs={24} md={12}>
                        <div className={"box-item"}>
                          <UserOutlined style={{fontSize: 25, color: '#003366'}}/>
                          <h4 style={{marginTop: 10}}>{renderSwitch(reportData.profile.profile.followers.toString())}</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Toplam Takipçi</p>
                            <Tooltip title="Youtube üzerinde olan toplam takipçi sayısı">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={12}>
                        <div className={"box-item"}>
                          <FundOutlined style={{fontSize: 25, color: 'rgb(97, 51, 156)'}}/>
                          <h4 style={{marginTop: 10}}>{parseFloat(parseFloat(reportData.profile.profile.engagementRate) * 100).toFixed(2)} %</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Toplam Etkileşim</p>
                            <Tooltip title="Ortalama beğenilerin abone sayısına oranı">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                      <Col xs={24} md={8}>
                        <div className={"box-item"}>
                          <EyeOutlined style={{fontSize: 25, color: '#003366'}}/>
                          <h4 style={{marginTop: 10}}>{renderSwitch(avgViews.toString())}</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Ortalama İzlenme Sayısı</p>
                            <Tooltip title="Son 10 video nun ortalama izlenme sayısı">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={8}>
                        <div className={"box-item"}>
                          <CommentOutlined style={{fontSize: 25, color: 'rgb(241, 133, 131)'}}/>
                          <h4 style={{marginTop: 10}}>{renderSwitch(avgComments.toString())}</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Ortalama Yorum Sayısı</p>
                            <Tooltip title="Son 10 video nun ortalama yorum sayısı">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={8}>
                        <div className={"box-item"}>
                          <HeartFilled style={{fontSize: 25, color: 'rgb(241, 133, 131)'}}/>
                          <h4 style={{marginTop: 10}}>{renderSwitch(avgLikes.toString())}</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Ortalama Beğeni Sayısı</p>
                            <Tooltip title="Son 10 video nun ortalama beğeni sayısı">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row gutter={[10, 10]}>
                      <Col xs={24} md={24}>
                        <p className={"detail-title-item"}>Takipçiler Hakkında</p>
                      </Col>
                      <Col xs={24} md={12}>
                        <div className={"box-item"}>
                          <UsergroupDeleteOutlined style={{fontSize: 25, color: 'rgb(250, 143, 56)'}}/>
                          <h4>{(parseFloat(reportData.profile.audience.notable) * 100).toFixed(2)} %</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Önemli Abone Oranı</p>
                            <Tooltip title="prompt text">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                        <div className={"gx-mt-1 box-item"}>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p className={"box-item-title"} style={{marginRight: 5}}>Takipçi Cinsiyeti</p>
                            <Tooltip title="prompt text">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                          <div style={{display: "flex", alignItems: 'center', flexDirection: 'column', width: '60%', margin: '10px auto'}}>
                            <span style={{width: '100%', marginBottom: 15}}>Erkek: <Progress
                              percent={parseFloat(reportData.profile.audience.genders[0].weight * 100).toFixed(2)}
                              strokeColor={`rgb(54, 162, 235)`}/></span>
                            <span style={{width: '100%', marginBottom: 15}}>Kadın: <Progress
                              percent={parseFloat(reportData.profile.audience.genders[1].weight * 100).toFixed(2)}
                              strokeColor={`rgb(255, 99, 132)`}/></span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={12}>
                        <div className={"box-item"} style={{textAlign: "left"}}>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginBottom: 15,
                            marginTop: 10
                          }}>
                            <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>Takipçi Lokasyonları</p>
                            <Tooltip title="prompt text">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                          {(reportData.profile.audience.geoCountries).slice(0, 4).map((item, index) => {
                            return (
                              <div key={`item-geo-${index}`} style={{width: '80%', marginBottom: 15}}>
                                <span>{item.name}</span>
                                <Progress percent={parseFloat(item.weight * 100).toFixed(2)}/>
                              </div>
                            )
                          })}
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginBottom: 25
                          }}>
                            <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Age and Gender Split</p>
                            <Tooltip title="prompt text">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                          <Row>
                            {(reportData.profile.audience.gendersPerAge).map((item, index) => {
                              return (
                                <Col key={`per-age-${index}`} xs={24} md={8}>
                                  <div className={"box-item"} style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    marginBottom: 10,
                                    paddingTop: 20,
                                  }}>
                                    <p style={{marginBottom: 0}}>{item.code}</p>
                                    <div style={{display: "flex", alignItems: 'center', flexDirection: 'column'}}>
                                      <span>Erkek: <Progress width={80} type="circle"
                                                             percent={parseFloat(item.male * 100).toFixed(2)}
                                                             strokeColor={`rgb(54, 162, 235)`}/></span>
                                      <span>Kadın: <Progress width={80} type="circle"
                                                             percent={parseFloat(item.female * 100).toFixed(2)}
                                                             strokeColor={`rgb(255, 99, 132)`}/></span>
                                    </div>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Benzer Kullanıcılar</p>
                          <Tooltip title="prompt text">
                            <InfoCircleOutlined/>
                          </Tooltip>
                        </div>
                        <div className={"box-item"} style={{padding: 20}}>
                          <Row>
                            {reportData.profile.audience.audienceLookalikes && (reportData.profile.audience.audienceLookalikes).map((item, index) => {
                              return (
                                <Col key={`per-look-${index}`} xs={24} md={8}>
                                  <div style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    marginBottom: 10
                                  }}>
                                    <a href={`${item.url}`} target={"_blank"} style={{
                                      display: "flex",
                                      alignItems: 'center',
                                      justifyContent: 'flex-start',
                                      width: "100%",
                                      paddingBottom: 10
                                    }}>
                                      <Avatar src={`${item.picture}`} size={25}/>
                                      <span style={{marginLeft: 10}}> {item.fullname}</span>
                                    </a>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Dikkat Edilebilir Fenomenler</p>
                          <Tooltip title="prompt text">
                            <InfoCircleOutlined/>
                          </Tooltip>
                        </div>
                        <div className={"box-item"} style={{padding: 20}}>
                          <Row>
                            {reportData.profile.audience.notableUsers && (reportData.profile.audience.notableUsers).map((item, index) => {
                              return (
                                <Col key={`per-note-${index}`} xs={24} md={8}>
                                  <div style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    marginBottom: 10
                                  }}>
                                    <a href={`${item.url}`} target={"_blank"} style={{
                                      display: "flex",
                                      alignItems: 'center',
                                      justifyContent: 'flex-start',
                                      width: "100%",
                                      paddingBottom: 10
                                    }}>
                                      <Avatar src={`${item.picture}`} size={25}/>
                                      <span style={{marginLeft: 10}}> {item.fullname}</span>
                                    </a>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Takipçi Dilleri</p>
                          <Tooltip title="prompt text">
                            <InfoCircleOutlined/>
                          </Tooltip>
                        </div>
                        <div className={"box-item"} style={{padding: 10}}>
                          <Row style={{width: 'calc(100% - 32px)'}}>
                            {reportData.profile.audience.languages && (reportData.profile.audience.languages).slice(0, 10).map((item, index) => {
                              return (
                                <Col key={`has-tags-${index}`} xs={24} md={8}>
                                  <div style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    flexDirection: "column",
                                    marginBottom: 10,
                                    textAlign: 'left'
                                  }}>
                                    <div style={{textAlign: "left", width: '100%'}}>
                                      <Tag color={"#108ee9"}>{item.name}</Tag>
                                    </div>
                                    <Progress percent={parseFloat(item.weight * 100).toFixed(2)}/>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>En çok beğenilen videolar </p>
                        </div>
                        <div>
                          <Row gutter={[10, 10]}>
                            {(reportData.profile.popularPosts).map((item, index) => {
                              return (
                                <Col key={`posts-${index}`} xs={12} md={6}>
                                  <div
                                    className={"box-item"}
                                    style={{
                                      display: "flex",
                                      alignItems: 'center',
                                      justifyContent: 'flex-start',
                                      flexDirection: "column",
                                      textAlign: 'left',
                                      marginBottom: 5,
                                    }}>
                                    <p style={{fontSize: 13, marginBottom: 10}}>Tarih: {moment(item.created).format('ll')}</p>
                                    <a href={`${item.url}`}
                                       target={"_blank"}
                                       style={{
                                         backgroundImage: `url(${item.thumbnail})`,
                                         display: 'block',
                                         height: '8rem',
                                         width: '100%',
                                         backgroundColor: '#000',
                                         backgroundPosition: '50%',
                                         backgroundSize: 'cover'
                                       }}
                                    >
                                    </a>
                                    <p style={{marginTop: 10}}>
                                      <span style={{display: 'flex', alignItems: 'center'}}>
                                        <HeartFilled style={{color: 'rgb(241, 133, 131)'}}/>
                                        <span style={{marginLeft: 5}}>{renderSwitch(item.likes.toString())}</span>
                                      </span>
                                    </p>
                                    <p>
                                      <span style={{display: 'flex', alignItems: 'center'}}>
                                        <CommentOutlined style={{color: '#4aabed'}} />
                                        <span style={{marginLeft: 5}}>{renderSwitch(item.comments.toString())}</span>
                                      </span>
                                    </p>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Son videolar </p>
                          <Tooltip title="prompt text">
                            <InfoCircleOutlined/>
                          </Tooltip>
                        </div>
                        <div>
                          <Row gutter={[10, 10]}>
                            {(reportData.profile.recentPosts).map((item, index) => {
                              return (
                                <Col key={`posts-${index}`} xs={12} md={6}>
                                  <div
                                    className={"box-item"}
                                    style={{
                                      display: "flex",
                                      alignItems: 'center',
                                      justifyContent: 'flex-start',
                                      flexDirection: "column",
                                      textAlign: 'left',
                                      marginBottom: 5,
                                    }}>
                                    <p style={{fontSize: 13, marginBottom: 10}}>Tarih: {moment(item.created).format('ll')}</p>
                                    <a href={`${item.url}`}
                                       target={"_blank"}
                                       style={{
                                         backgroundImage: `url(${item.thumbnail})`,
                                         display: 'block',
                                         height: '8rem',
                                         width: '100%',
                                         backgroundColor: '#000',
                                         backgroundPosition: '50%',
                                         backgroundSize: 'cover'
                                       }}
                                    >
                                    </a>
                                    <p style={{marginTop: 10}}>
                                      <span style={{display: 'flex', alignItems: 'center'}}>
                                        <HeartFilled style={{color: 'rgb(241, 133, 131)'}}/>
                                        <span style={{marginLeft: 5}}>{renderSwitch(item.likes.toString())}</span>
                                      </span>
                                    </p>
                                    <p>
                                      <span style={{display: 'flex', alignItems: 'center'}}>
                                        <CommentOutlined style={{color: '#4aabed'}} />
                                        <span style={{marginLeft: 5}}>{renderSwitch(item.comments.toString())}</span>
                                      </span>
                                    </p>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
        }
        {network === 'tiktok' &&
        <Card className={"gx-mt-3"} type="inner" title={null} extra={null} style={{marginTop: 10}}>
          <div>
            <Row align={"middle"} justify={"center"}>
              <Col xs={24} md={22}>
                <div className={"gx-text-center"}>
                  <Avatar size={100} src={`${reportData.profile.profile.picture}`}/>
                  <h4>{reportData.profile.profile.fullname}</h4>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <RetweetOutlined size={40}/>
                    <a href={`${reportData.profile.profile.url}`} target={"_blank"}
                       style={{marginLeft: 5, fontSize: 15}}>
                      <span>{reportData.profile.profile.username}</span>
                    </a>
                  </div>
                  <div className={"gx-mt-5"}>
                    <Row gutter={[10, 10]}>
                      <Col xs={24} md={12}>
                        <div className={"box-item"}>
                          <UserOutlined style={{fontSize: 25, color: '#003366'}}/>
                          <h4 style={{marginTop: 10}}>{renderSwitch(reportData.profile.profile.followers.toString())}</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Toplam Takipçi</p>
                            <Tooltip title="Youtube üzerinde olan toplam takipçi sayısı">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={12}>
                        <div className={"box-item"}>
                          <FundOutlined style={{fontSize: 25, color: 'rgb(97, 51, 156)'}}/>
                          <h4 style={{marginTop: 10}}>{parseFloat(parseFloat(reportData.profile.profile.engagementRate) * 100).toFixed(2)} %</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Toplam Etkileşim</p>
                            <Tooltip title="Ortalama beğenilerin abone sayısına oranı">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                      <Col xs={24} md={8}>
                        <div className={"box-item"}>
                          <EyeOutlined style={{fontSize: 25, color: '#003366'}}/>
                          <h4 style={{marginTop: 10}}>{renderSwitch(avgViews.toString())}</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Ortalama İzlenme Sayısı</p>
                            <Tooltip title="Son 10 video nun ortalama izlenme sayısı">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={8}>
                        <div className={"box-item"}>
                          <CommentOutlined style={{fontSize: 25, color: 'rgb(241, 133, 131)'}}/>
                          <h4 style={{marginTop: 10}}>{renderSwitch(avgComments.toString())}</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Ortalama Yorum Sayısı</p>
                            <Tooltip title="Son 10 video nun ortalama yorum sayısı">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={8}>
                        <div className={"box-item"}>
                          <HeartFilled style={{fontSize: 25, color: 'rgb(241, 133, 131)'}}/>
                          <h4 style={{marginTop: 10}}>{renderSwitch(avgLikes.toString())}</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Ortalama Beğeni Sayısı</p>
                            <Tooltip title="Son 10 video nun ortalama beğeni sayısı">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row gutter={[10, 10]}>
                      <Col xs={24} md={24}>
                        <p className={"detail-title-item"}>Takipçiler Hakkında</p>
                      </Col>
                      <Col xs={24} md={12}>
                        <div className={"box-item"}>
                          <UsergroupDeleteOutlined style={{fontSize: 25, color: 'rgb(250, 143, 56)'}}/>
                          <h4>{(parseFloat(reportData.profile.audience.notable) * 100).toFixed(2)} %</h4>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginBottom: 0, marginRight: 5}}>Önemli Abone Oranı</p>
                            <Tooltip title="prompt text">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                        </div>
                        <div className={"gx-mt-1 box-item"}>
                          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p className={"box-item-title"} style={{marginRight: 5}}>Takipçi Cinsiyeti</p>
                            <Tooltip title="prompt text">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                          <div style={{display: "flex", alignItems: 'center', flexDirection: 'column', width: '60%', margin: '10px auto'}}>
                            <span style={{width: '100%', marginBottom: 15}}>Erkek: <Progress
                              percent={parseFloat(reportData.profile.audience.genders[0].weight * 100).toFixed(2)}
                              strokeColor={`rgb(54, 162, 235)`}/></span>
                            <span style={{width: '100%', marginBottom: 15}}>Kadın: <Progress
                              percent={parseFloat(reportData.profile.audience.genders[1].weight * 100).toFixed(2)}
                              strokeColor={`rgb(255, 99, 132)`}/></span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={12}>
                        <div className={"box-item"} style={{textAlign: "left"}}>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginBottom: 15,
                            marginTop: 10
                          }}>
                            <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>Takipçi Lokasyonları</p>
                            <Tooltip title="prompt text">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                          {(reportData.profile.audience.geoCountries).slice(0, 4).map((item, index) => {
                            return (
                              <div key={`item-geo-${index}`} style={{width: '80%', marginBottom: 15}}>
                                <span>{item.name}</span>
                                <Progress percent={parseFloat(item.weight * 100).toFixed(2)}/>
                              </div>
                            )
                          })}
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginBottom: 25
                          }}>
                            <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Yaş ve Cinsiyet İstatistikleri</p>
                            <Tooltip title="Takipçilerin yaş ve cinsiyet grafikleri">
                              <InfoCircleOutlined/>
                            </Tooltip>
                          </div>
                          <Row>
                            {(reportData.profile.audience.gendersPerAge).map((item, index) => {
                              return (
                                <Col key={`per-age-${index}`} xs={24} md={8}>
                                  <div className={"box-item"} style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    marginBottom: 10,
                                    paddingTop: 20,
                                  }}>
                                    <p style={{marginBottom: 0}}>{item.code}</p>
                                    <div style={{display: "flex", alignItems: 'center', flexDirection: 'column'}}>
                                      <span>Erkek: <Progress width={80} type="circle"
                                                             percent={parseFloat(item.male * 100).toFixed(2)}
                                                             strokeColor={`rgb(54, 162, 235)`}/></span>
                                      <span>Kadın: <Progress width={80} type="circle"
                                                             percent={parseFloat(item.female * 100).toFixed(2)}
                                                             strokeColor={`rgb(255, 99, 132)`}/></span>
                                    </div>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Benzer Kullanıcılar</p>
                          <Tooltip title="prompt text">
                            <InfoCircleOutlined/>
                          </Tooltip>
                        </div>
                        <div className={"box-item"} style={{padding: 20}}>
                          <Row>
                            {reportData.profile.audience.audienceLookalikes && (reportData.profile.audience.audienceLookalikes).map((item, index) => {
                              return (
                                <Col key={`per-look-${index}`} xs={24} md={8}>
                                  <div style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    marginBottom: 10
                                  }}>
                                    <a href={`${item.url}`} target={"_blank"} style={{
                                      display: "flex",
                                      alignItems: 'center',
                                      justifyContent: 'flex-start',
                                      width: "100%",
                                      paddingBottom: 10
                                    }}>
                                      <Avatar src={`${item.picture}`} size={25}/>
                                      <span style={{marginLeft: 10}}> {item.fullname}</span>
                                    </a>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Dikkat Edilebilir Fenomenler</p>
                          <Tooltip title="prompt text">
                            <InfoCircleOutlined/>
                          </Tooltip>
                        </div>
                        <div className={"box-item"} style={{padding: 20}}>
                          <Row>
                            {reportData.profile.audience.notableUsers && (reportData.profile.audience.notableUsers).map((item, index) => {
                              return (
                                <Col key={`per-note-${index}`} xs={24} md={8}>
                                  <div style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    marginBottom: 10
                                  }}>
                                    <a href={`${item.url}`} target={"_blank"} style={{
                                      display: "flex",
                                      alignItems: 'center',
                                      justifyContent: 'flex-start',
                                      width: "100%",
                                      paddingBottom: 10
                                    }}>
                                      <Avatar src={`${item.picture}`} size={25}/>
                                      <span style={{marginLeft: 10}}> {item.fullname}</span>
                                    </a>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Takipçi Dilleri</p>
                          <Tooltip title="prompt text">
                            <InfoCircleOutlined/>
                          </Tooltip>
                        </div>
                        <div className={"box-item"} style={{padding: 10}}>
                          <Row style={{width: 'calc(100% - 32px)'}}>
                            {reportData.profile.audience.languages && (reportData.profile.audience.languages).slice(0, 10).map((item, index) => {
                              return (
                                <Col key={`has-tags-${index}`} xs={24} md={8}>
                                  <div style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    flexDirection: "column",
                                    marginBottom: 10,
                                    textAlign: 'left'
                                  }}>
                                    <div style={{textAlign: "left", width: '100%'}}>
                                      <Tag color={"#108ee9"}>{item.name}</Tag>
                                    </div>
                                    <Progress percent={parseFloat(item.weight * 100).toFixed(2)}/>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>En çok beğenilen videolar </p>
                        </div>
                        <div>
                          <Row gutter={[10, 10]}>
                            {(reportData.profile.popularPosts).map((item, index) => {
                              return (
                                <Col key={`posts-${index}`} xs={12} md={6}>
                                  <div
                                    className={"box-item"}
                                    style={{
                                      display: "flex",
                                      alignItems: 'center',
                                      justifyContent: 'flex-start',
                                      flexDirection: "column",
                                      textAlign: 'left',
                                      marginBottom: 5,
                                    }}>
                                    <p style={{fontSize: 13, marginBottom: 10}}>Tarih: {moment(item.created).format('ll')}</p>
                                    <a href={`${item.url}`}
                                       target={"_blank"}
                                       style={{
                                         backgroundImage: `url(${item.thumbnail})`,
                                         display: 'block',
                                         height: '8rem',
                                         width: '100%',
                                         backgroundColor: '#000',
                                         backgroundPosition: '50%',
                                         backgroundSize: 'cover'
                                       }}
                                    >
                                    </a>
                                    <p style={{marginTop: 10}}>
                                      <span style={{display: 'flex', alignItems: 'center'}}>
                                        <HeartFilled style={{color: 'rgb(241, 133, 131)'}}/>
                                        <span style={{marginLeft: 5}}>{renderSwitch(item.likes.toString())}</span>
                                      </span>
                                    </p>
                                    <p>
                                      <span style={{display: 'flex', alignItems: 'center'}}>
                                        <CommentOutlined style={{color: '#4aabed'}} />
                                        <span style={{marginLeft: 5}}>{renderSwitch(item.comments.toString())}</span>
                                      </span>
                                    </p>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="gx-mt-5">
                    <Row>
                      <Col xs={24} md={24}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginBottom: 25
                        }}>
                          <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Son videolar </p>
                          <Tooltip title="prompt text">
                            <InfoCircleOutlined/>
                          </Tooltip>
                        </div>
                        <div>
                          <Row gutter={[10, 10]}>
                            {(reportData.profile.recentPosts).map((item, index) => {
                              return (
                                <Col key={`posts-${index}`} xs={12} md={6}>
                                  <div
                                    className={"box-item"}
                                    style={{
                                      display: "flex",
                                      alignItems: 'center',
                                      justifyContent: 'flex-start',
                                      flexDirection: "column",
                                      textAlign: 'left',
                                      marginBottom: 5,
                                    }}>
                                    <p style={{fontSize: 13, marginBottom: 10}}>Tarih: {moment(item.created).format('ll')}</p>
                                    <a href={`${item.url}`}
                                       target={"_blank"}
                                       style={{
                                         backgroundImage: `url(${item.thumbnail})`,
                                         display: 'block',
                                         height: '8rem',
                                         width: '100%',
                                         backgroundColor: '#000',
                                         backgroundPosition: '50%',
                                         backgroundSize: 'cover'
                                       }}
                                    >
                                    </a>
                                    <p style={{marginTop: 10}}>
                                      <span style={{display: 'flex', alignItems: 'center'}}>
                                        <HeartFilled style={{color: 'rgb(241, 133, 131)'}}/>
                                        <span style={{marginLeft: 5}}>{renderSwitch(item.likes.toString())}</span>
                                      </span>
                                    </p>
                                    <p>
                                      <span style={{display: 'flex', alignItems: 'center'}}>
                                        <CommentOutlined style={{color: '#4aabed'}} />
                                        <span style={{marginLeft: 5}}>{renderSwitch(item.comments.toString())}</span>
                                      </span>
                                    </p>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
        }
      </div>
      }
    </Spin>
  )
}

const mapStateToProps = (state) => {

  return {
    user: state.user.user,
    reportData: state.list.reportData,
    loading: state.list.loading,
  }
}

export default connect(mapStateToProps, {postGeneratePdf, isLoggedIn})(DetailPage);

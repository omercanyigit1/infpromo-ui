import React, {useEffect} from 'react';
import { Card, Avatar, Statistic, Row, Col, Progress, Tag, List, Menu, Breadcrumb} from 'antd';
import { Container } from "reactstrap";
import {
  InstagramOutlined,
  UserOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  FundOutlined,
  UsergroupDeleteOutlined,
  HeartFilled,
  CommentOutlined,
} from "@ant-design/icons";
import moment from 'moment';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Bar,
  BarChart,
  Tooltip
} from 'recharts';
import 'react-popper-tooltip/dist/styles.css';
import sampleData from './../../constants/sample-report.json';
import Layout from "./../LandingApp/components/Layout";
import ScrollUpButton from "react-scroll-up-button";
import FeatherIcon from "feather-icons-react";
const NavbarPage = React.lazy(() => import("./../LandingApp/components/Layout/NavbarPage"));
const Footer = React.lazy(() => import("./../LandingApp/components/Layout/Footer"));

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

const SampleReport = () => {
  const reportData = sampleData.data.pdfBody;

  function scrollNavigation() {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 80) {
      document.getElementById("topnav").classList.add("nav-sticky");
    } else {
      document.getElementById("topnav").classList.remove("nav-sticky");
    }
  }

  useEffect(() => {
    document.body.classList = "";
    window.addEventListener("scroll", scrollNavigation, true);
  })

  function formatXAxis(tickItem) {
    return moment(tickItem).format('ll')
  }

  function formatYAxis(tickItem) {
    let newTick = `${tickItem}`;
    return renderSwitch(newTick);
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{backgroundColor: 'rgba(255, 255, 255, .9)', padding: 10, borderRadius: 4, border: '1px solid #e5e5e5'}}>
          <p className="label" style={{color: `${payload[0].color}`}}>{`Be??eni : ${formatYAxis(payload[0].value)}`}</p>
          <p className="label" style={{color: `${payload[1].color}`}}>{`Yorum : ${formatYAxis(payload[1].value)}`}</p>
          <p className="intro" style={{color: '#000'}}>Tarih: {formatXAxis(label)}</p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltipOne = ({ active, payload, label, string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{backgroundColor: 'rgba(255, 255, 255, .9)', padding: 10, borderRadius: 4, border: '1px solid #e5e5e5'}}>
          <p className="label" style={{color: `${payload[0].color}`}}>{`${string}: ${formatYAxis(payload[0].value)}`}</p>
          <p className="intro" style={{color: '#000'}}>Tarih: {label}</p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = () => {
    return (
      <i>
        <FeatherIcon icon="arrow-up" className="icons" />
      </i>
    );
  };


  const BodyContent = () => {
    return (
      <Container style={{paddingTop: 100}}>
        <Row align={"middle"} justify={"center"}>
          <Col xs={24} md={24}>
            <div className="title-heading">
              <h3 className="title mb-1">
                Profil Detay??
              </h3>
              <p className="para-desc text-muted">
                Se??ti??iniz profilin detay??n?? buradan g??rebilirsiniz.
              </p>
            </div>
            <Card className={"gx-mt-3"} type="inner" title={null} extra={null} style={{marginTop: 10}}>
              <div>
                <Row align={"middle"} justify={"space-between"}>
                  <Col xs={24} md={24}>

                  </Col>
                </Row>
                <Row align={"middle"} justify={"center"}>
                  <Col xs={24} md={24}>
                    <div className={"gx-text-center"}>
                      <Avatar size={100} src={`${reportData.profile.profile.picture}`} style={{border: '1px solid #e5e5e5'}}/>
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
                              <h4
                                style={{marginTop: 10}}>{renderSwitch(reportData.profile.profile.followers.toString())}</h4>
                              <p style={{marginBottom: 0}}>Takip??i</p>
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
                                    </div>
                                  }
                                />
                              }
                            </div>
                          </Col>
                          <Col xs={24} md={8}>
                            <div className={"box-item"}>
                              <HeartFilled style={{fontSize: 25, color: 'rgb(241, 133, 131)'}}/>
                              <h4
                                style={{marginTop: 10}}>{renderSwitch(reportData.profile.profile.engagements.toString())}</h4>
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
                                    </div>
                                  }
                                />
                              }
                            </div>
                          </Col>
                          <Col xs={24} md={8}>
                            <div className={"box-item"}>
                              <FundOutlined style={{fontSize: 25, color: 'rgb(97, 51, 156)'}}/>
                              <h4
                                style={{marginTop: 10}}>{parseFloat(parseFloat(reportData.profile.profile.engagementRate) * 100).toFixed(2)} %</h4>
                              <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p style={{marginBottom: 0, marginRight: 5}}>Etkile??im Oran??</p>
                              </div>
                              <small className={"text-muted"} style={{marginTop: 5}}>( takip??i say??s?? / <br/> ( be??eni say??s?? + yorum say??s?? + vs. ) )</small>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      <div className={"gx-mt-1"}>
                        <Row gutter={[10, 10]}>
                          <Col xs={24} md={12}>
                            <div className={"box-item"}>
                              <HeartFilled style={{fontSize: 25, color: 'rgb(241, 133, 131)'}}/>
                              <h4
                                style={{marginTop: 10}}>{renderSwitch(reportData.profile.avgLikes.toString())}</h4>
                              <p style={{marginBottom: 0}}>Ortalama Be??eni Say??s??</p>
                              <small className={"text-muted"} style={{marginTop: 5}}>(***Son 10 post baz al??narak hesaplanm????t??r.)</small>
                            </div>
                          </Col>
                          <Col xs={24} md={12}>
                            <div className={"box-item"}>
                              <CommentOutlined style={{fontSize: 25, color: '#003366'}}/>
                              <h4 style={{marginTop: 10}}>{reportData.profile.avgComments}</h4>
                              <p style={{marginBottom: 0}}>Ortalama Yorum Say??s??</p>
                              <small className={"text-muted"} style={{marginTop: 5}}>(***Son 10 post baz al??narak hesaplanm????t??r.)</small>
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
                              <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Populer
                                postlar </p>
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
                                        <p style={{
                                          fontSize: 13,
                                          marginBottom: 10
                                        }}>Tarih: {moment(item.created).format('ll')}</p>
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
                                        <CommentOutlined style={{color: '#4aabed'}}/>
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
                          <Col xs={24} md={12}>
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              marginBottom: 25
                            }}>
                              <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Takip??iler bu
                                ay</p>
                              {
                                reportData.profile.stats.followers.compared > 0 &&
                                <div style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                }}>
                                  <Statistic
                                    title={null}
                                    value={parseFloat(parseFloat(reportData.profile.stats.followers.compared) * 100).toFixed(2)}
                                    precision={2}
                                    style={{marginTop: 3}}
                                    valueStyle={{color: '#3f8600'}}
                                    prefix={<CaretUpOutlined/>}
                                    suffix={
                                      <div style={{display: 'flex', alignItems: "center"}}>
                                        <span>% </span> {" "}
                                      </div>
                                    }
                                  />
                                  {" "}
                                  <p className={"detail-title-item"} style={{marginBottom: 0, marginLeft: 5}}>art????
                                    g??stermi??</p>
                                </div>
                              }
                              {
                                reportData.profile.stats.followers.compared < 0 &&
                                <div style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                }}>
                                  <Statistic
                                    title={null}
                                    value={parseFloat(parseFloat(reportData.profile.stats.followers.compared) * 100).toFixed(2)}
                                    precision={2}
                                    valueStyle={{color: '#cf1322'}}
                                    prefix={<CaretDownOutlined/>}
                                    suffix={
                                      <div style={{display: 'flex', alignItems: "center"}}>
                                        <span>% </span> {" "}
                                      </div>
                                    }
                                  />
                                  <p className={"detail-title-item"} style={{marginBottom: 0, marginLeft: 5}}>azalma
                                    g??stermi??</p>
                                </div>
                              }
                            </div>
                            <div className="box-item">
                              {reportData.profile.statHistory &&
                              <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={reportData.profile.statHistory}
                                           margin={{top: 10, right: 10, left: -10, bottom: 0}}>
                                  <XAxis dataKey="month" tickCount={20} minTickGap={-20} angle={-30} tickSize={15}
                                         height={40} padding={{top: 10}}/>
                                  <YAxis tickFormatter={formatYAxis}/>
                                  <CartesianGrid strokeDasharray="3 3"/>
                                  <Tooltip content={<CustomTooltipOne string={"Takip??i"} />} />
                                  <Legend/>
                                  <Line type="monotone" dataKey="followers" stroke="#3367d6" strokeWidth={2}
                                        activeDot={{r: 3}}/>
                                </LineChart>
                              </ResponsiveContainer>
                              }
                            </div>
                          </Col>
                          <Col xs={24} md={12}>
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              marginBottom: 25
                            }}>
                              <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Takip edilen
                                say??s?? </p>
                            </div>
                            <div className="box-item">
                              {reportData.profile.statHistory &&
                              <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={reportData.profile.statHistory}
                                           margin={{top: 10, right: 10, left: -10, bottom: 0}}>
                                  <XAxis dataKey="month" tickCount={20} minTickGap={-20} angle={-30} tickSize={15}
                                         height={40} padding={{top: 10}}/>
                                  <YAxis/>
                                  <CartesianGrid strokeDasharray="3 3"/>
                                  <Tooltip content={<CustomTooltipOne string={"Takip"} />}/>
                                  <Legend/>
                                  <Line type="monotone" dataKey="following" stroke="#3367d6" strokeWidth={2}
                                        activeDot={{r: 3}}/>
                                </LineChart>
                              </ResponsiveContainer>
                              }
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
                              <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Son 8 Post
                                Etkile??imleri </p>
                            </div>
                            <div className="box-item">
                              {reportData.profile.recentPosts &&
                              <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                  data={reportData.profile.recentPosts && reportData.profile.recentPosts.slice(0, 8)}
                                  label={(name, value) => `${name}: ${value}`}
                                  margin={{top: 10, right: 0, left: 0, bottom: 0}}>
                                  <XAxis dataKey="created" tickFormatter={formatXAxis} tickCount={20} minTickGap={-20}
                                         angle={0} tickSize={20} height={40} padding={{top: 10}}/>
                                  <YAxis tickFormatter={formatYAxis}/>
                                  <CartesianGrid strokeDasharray="3 3"/>
                                  <Tooltip content={<CustomTooltip />}/>
                                  <Legend/>
                                  <Bar dataKey="likes" fill="#3367d6"/>
                                  <Bar dataKey="comments" fill="#ffc658"/>
                                </BarChart>
                              </ResponsiveContainer>
                              }
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="gx-mt-5">
                        <Row>
                          <Col xs={24} md={16}>
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              marginBottom: 25
                            }}>
                              <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Be??eni say??s?? bu
                                ay</p>
                              {
                                reportData.profile.stats.avgLikes.compared > 0 &&
                                <div style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                }}>
                                  <Statistic
                                    title={null}
                                    value={parseFloat(parseFloat(reportData.profile.stats.avgLikes.compared) * 100).toFixed(2)}
                                    precision={2}
                                    style={{marginTop: 3}}
                                    valueStyle={{color: '#3f8600'}}
                                    prefix={<CaretUpOutlined/>}
                                    suffix={
                                      <div style={{display: 'flex', alignItems: "center"}}>
                                        <span>% </span> {" "}
                                      </div>
                                    }
                                  />
                                  {" "}
                                  <p className={"detail-title-item"} style={{marginBottom: 0, marginLeft: 5}}>art????
                                    g??stermi??</p>
                                </div>
                              }
                              {
                                reportData.profile.stats.avgLikes.compared < 0 &&
                                <div style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                }}>
                                  <Statistic
                                    title={null}
                                    value={parseFloat(parseFloat(reportData.profile.stats.avgLikes.compared) * 100).toFixed(2)}
                                    precision={2}
                                    valueStyle={{color: '#cf1322'}}
                                    prefix={<CaretDownOutlined/>}
                                    suffix={
                                      <div style={{display: 'flex', alignItems: "center"}}>
                                        <span>% </span> {" "}
                                      </div>
                                    }
                                  />
                                  <p className={"detail-title-item"} style={{marginBottom: 0, marginLeft: 5}}>azalma
                                    g??stermi??</p>
                                </div>
                              }
                            </div>
                            <div className="box-item">
                              {reportData.profile.statHistory &&
                              <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={reportData.profile.statHistory}
                                           margin={{top: 10, right: 10, left: -10, bottom: 0}}>
                                  <XAxis dataKey="month" tickCount={20} minTickGap={-20} angle={-30} tickSize={15}
                                         height={40} padding={{top: 10}}/>
                                  <YAxis tickFormatter={formatYAxis}/>
                                  <CartesianGrid strokeDasharray="3 3"/>
                                  <Tooltip content={<CustomTooltipOne string={"Be??eni"} />} />
                                  <Legend/>
                                  <Line type="monotone" dataKey="avgLikes" stroke="#3367d6" strokeWidth={2}
                                        activeDot={{r: 3}}/>
                                </LineChart>
                              </ResponsiveContainer>
                              }

                            </div>
                          </Col>
                          <Col xs={24} md={8}>
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              marginBottom: 25
                            }}>
                              <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Pop??ler #
                                (hastags)</p>
                            </div>
                            <div className={"box-item"} style={{padding: 10}}>
                              <div style={{marginTop: 15}}>
                                {reportData.profile.hashtags && reportData.profile.hashtags.slice(0, 8).map((item, index) => {
                                  return (
                                    <Tag color={"#108ee9"}>#{item.tag}</Tag>
                                  )
                                })}
                              </div>
                            </div>
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              marginBottom: 25
                            }}>
                              <p className={"detail-title-item"} style={{marginBottom: 0, marginRight: 5}}>Pop??ler @
                                (mentions)</p>
                            </div>
                            <div className="box-item" style={{padding: 10}}>
                              <div style={{marginTop: 15}}>
                                {reportData.profile.mentions && reportData.profile.mentions.slice(0, 8).map((item, index) => {
                                  return (
                                    <Tag color={"#108ee9"}>@{item.tag}</Tag>
                                  )
                                })}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="gx-mt-5">
                        <Row gutter={[10, 10]}>
                          <Col xs={24} md={24}>
                            <p className={"detail-title-item"}>Takip??ilere g??re kitle verileri</p>
                          </Col>
                          <Col xs={24} md={12}>
                            <div className={"box-item"}>
                              <UsergroupDeleteOutlined style={{fontSize: 25, color: 'rgb(250, 143, 56)'}}/>
                              <h4>{parseFloat((parseFloat(reportData.profile.audience.credibility) * 100).toFixed(2)).toFixed(2)} %</h4>
                              <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p style={{marginBottom: 0, marginRight: 5}}>Reel Takip??i Oran??</p>
                              </div>
                              <small className={"text-muted"} style={{marginTop: 5}}>(Influencer '?? takip edip, aktif olmayan kullan??c??lar baz al??narak hesaplanm????t??r. )</small>
                            </div>
                            <div className={"gx-mt-1 box-item"}>
                              <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p className={"box-item-title"} style={{marginRight: 5}}>Takip??i Cinsiyeti</p>
                              </div>
                              <div style={{
                                display: "flex",
                                alignItems: 'center',
                                flexDirection: 'column',
                                width: '60%',
                                margin: '10px auto'
                              }}>
                                {reportData.profile.audience.genders && reportData.profile.audience.genders.map((item) => {
                                  if (item.code === "FEMALE") {
                                    return (
                                      <span style={{width: '100%', marginBottom: 15}}>Kad??n: <Progress
                                        percent={parseFloat(item.weight * 100).toFixed(2)}
                                        strokeColor={`rgb(255, 99, 132)`}/></span>
                                    )
                                  } else {
                                    return (
                                      <span style={{width: '100%', marginBottom: 15}}>Erkek: <Progress
                                        percent={parseFloat(item.weight * 100).toFixed(2)}
                                        strokeColor={`rgb(54, 162, 235)`}/></span>
                                    )
                                  }
                                })}
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
                                <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>Takip??i Lokasyonlar??</p>
                              </div>
                              {reportData.profile.audience.geoCountries && reportData.profile.audience.geoCountries.slice(0, 4).map((item, index) => {
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
                                <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>Top 5 ??ehir</p>
                              </div>
                              {reportData.profile.audience.geoCities && reportData.profile.audience.geoCities.slice(0, 5).map((item, index) => {
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
                      <div className="gx-mt-2">
                        <Row>
                          <Col xs={24} md={24}>
                            <div className={"box-item"}>
                              <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                marginBottom: 15,
                                marginTop: 10
                              }}>
                                <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>Ya?? ve Cinsiyet
                                  ??statistikleri</p>
                              </div>
                              <Row>
                                {reportData.profile.audience.gendersPerAge && reportData.profile.audience.gendersPerAge.map((item, index) => {
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
                                          <span>Kad??n: <Progress width={80} type="circle"
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
                      <div className="gx-mt-3">
                        <Row>
                          <Col xs={24} md={12}>
                            <div className="box-item">
                              <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                marginBottom: 15,
                                marginTop: 10
                              }}>
                                <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>Marka Yak??nl?????? (Brand Affinity)</p>
                              </div>
                              <div style={{
                                display: "flex",
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                marginBottom: 10,
                                flexDirection: 'column',
                                textAlign: 'left',
                                width: '100%'
                              }}>
                                {reportData.profile.brandAffinity && reportData.profile.brandAffinity.slice(0, 8).map((item, index) => {
                                  return (
                                    <p style={{display: 'inline-block', width: '100%'}}>
                                      <span style={{marginLeft: 10, color: '#2f55d4'}}> {item.name}</span>
                                    </p>
                                  )
                                })}
                              </div>
                            </div>
                          </Col>
                          <Col xs={24} md={12}>
                            <div className="box-item">
                              <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                marginBottom: 15,
                                marginTop: 10
                              }}>
                                <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>??lgi alanlar?? (Interests)</p>
                              </div>
                              <div style={{
                                display: "flex",
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                marginBottom: 10,
                                flexDirection: 'column',
                                textAlign: 'left',
                                width: '100%'
                              }}>
                                {reportData.profile.audience.interests && reportData.profile.audience.interests.slice(0, 8).map((item, index) => {
                                  return (
                                    <p style={{display: 'inline-block', width: '100%'}}>
                                      <span style={{marginLeft: 10, color: '#2f55d4'}}> {item.name}</span>
                                    </p>
                                  )
                                })}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="gx-mt-5">
                        <Row gutter={[10, 10]}>
                          <Col xs={24} md={24}>
                            <p className={"detail-title-item"}>Be??enilere g??re kitle verileri (Be??enen kullan??c??lar??n verileri)</p>
                          </Col>
                          <Col xs={24} md={12}>
                            <Row gutter={[5, 5]}>
                              <Col xs={24} md={12}>
                                <div className={"box-item"}>
                                  <UsergroupDeleteOutlined style={{fontSize: 25, color: 'rgb(250, 143, 56)'}}/>
                                  <h4>{parseFloat((parseFloat(reportData.profile.audienceLikers.credibility) * 100).toFixed(2)).toFixed(2)} %</h4>
                                  <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <p style={{marginBottom: 0, marginRight: 5}}>Be??enen kullan??c??lar??n reel oran??</p>
                                  </div>
                                </div>
                              </Col>
                              <Col xs={24} md={12}>
                                <div className={"box-item"}>
                                  <UsergroupDeleteOutlined style={{fontSize: 25, color: 'rgb(250, 143, 56)'}}/>
                                  <h4>{parseFloat((parseFloat(reportData.profile.audienceLikers.nonFollowerLikes) * 100).toFixed(2)).toFixed(2)} %</h4>
                                  <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <p style={{marginBottom: 0, marginRight: 5}}>Takip??i olmayan kullan??c??lar??n be??enme oran?? </p>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <div className={"gx-mt-1 box-item"}>
                              <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p className={"box-item-title"} style={{marginRight: 5}}>Be??eni Cinsiyet Da????l??m??</p>
                              </div>
                              <div style={{
                                display: "flex",
                                alignItems: 'center',
                                flexDirection: 'column',
                                width: '60%',
                                margin: '10px auto'
                              }}>
                                {reportData.profile.audienceLikers.genders && reportData.profile.audienceLikers.genders.map((item) => {
                                  if (item.code === "FEMALE") {
                                    return (
                                      <span style={{width: '100%', marginBottom: 15}}>Kad??n: <Progress
                                        percent={parseFloat(item.weight * 100).toFixed(2)}
                                        strokeColor={`rgb(255, 99, 132)`}/></span>
                                    )
                                  } else {
                                    return (
                                      <span style={{width: '100%', marginBottom: 15}}>Erkek: <Progress
                                        percent={parseFloat(item.weight * 100).toFixed(2)}
                                        strokeColor={`rgb(54, 162, 235)`}/></span>
                                    )
                                  }
                                })}
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
                                <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>Be??enen kullan??c??lar??n Lokasyonlar??</p>
                              </div>
                              {reportData.profile.audienceLikers.geoCountries && reportData.profile.audienceLikers.geoCountries.slice(0, 4).map((item, index) => {
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
                                <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>Top 5 ??ehir</p>
                              </div>
                              {reportData.profile.audienceLikers.geoCities && reportData.profile.audienceLikers.geoCities.slice(0, 5).map((item, index) => {
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
                      <div className="gx-mt-2">
                        <Row>
                          <Col xs={24} md={24}>
                            <div className={"box-item"}>
                              <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                marginBottom: 15,
                                marginTop: 10
                              }}>
                                <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>Be??enen kullan??c??lar??n Ya?? ve Cinsiyet ??statistikleri</p>
                              </div>
                              <Row>
                                {reportData.profile.audienceLikers.gendersPerAge && (reportData.profile.audienceLikers.gendersPerAge).map((item, index) => {
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
                                          <span>Kad??n: <Progress width={80} type="circle"
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
                      <div className="gx-mt-3">
                        <Row>
                          <Col xs={24} md={12}>
                            <div className="box-item">
                              <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                marginBottom: 15,
                                marginTop: 10
                              }}>
                                <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>Be??enen Kullan??c??lar??n Marka Yak??nl?????? (Brand Affinity)</p>
                              </div>
                              <div style={{
                                display: "flex",
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                marginBottom: 10,
                                flexDirection: 'column',
                                textAlign: 'left',
                                width: '100%'
                              }}>
                                {reportData.profile.audienceLikers.brandAffinity && reportData.profile.audienceLikers.brandAffinity.slice(0, 8).map((item, index) => {
                                  return (
                                    <p style={{display: 'inline-block', width: '100%'}}>
                                      <span style={{marginLeft: 10, color: '#2f55d4'}}> {item.name}</span>
                                    </p>
                                  )
                                })}
                              </div>
                            </div>
                          </Col>
                          <Col xs={24} md={12}>
                            <div className="box-item">
                              <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                marginBottom: 15,
                                marginTop: 10
                              }}>
                                <p className={"box-item-title"} style={{marginBottom: 0, marginRight: 5}}>Be??enen Kullan??c??lar??n ??lgi alanlar?? (Interests)</p>
                              </div>
                              <div style={{
                                display: "flex",
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                marginBottom: 10,
                                flexDirection: 'column',
                                textAlign: 'left',
                                width: '100%'
                              }}>
                                {reportData.profile.audienceLikers.interests && reportData.profile.audienceLikers.interests.slice(0, 8).map((item, index) => {
                                  return (
                                    <p style={{display: 'inline-block', width: '100%'}}>
                                      <span style={{marginLeft: 10, color: '#2f55d4'}}> {item.name}</span>
                                    </p>
                                  )
                                })}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="gx-mt-5">
                        <Row gutter={[10, 10]}>
                          <Col xs={24} sm={24}>
                            <p className={"detail-title-item"}>Takip??ilerin referans kullan??c??lar?? (Notable followers)</p>
                          </Col>
                          <Col xs={24} sm={24}>
                            {reportData.profile.audience.notableUsers &&
                            <List
                              className="list-item list-item-detail-page gx-mt-2"
                              itemLayout="horizontal"
                              locale={{emptyText: 'Veri Yok'}}
                              bordered={true}
                              size={'large'}
                              dataSource={reportData.profile.audience.notableUsers.slice(0, 15)}
                              column={3}
                              renderItem={(item, index) => (
                                <List.Item
                                  key={`list-${index}`}
                                  className={`list-item-${index}`}>
                                  <Row style={{width: '100%'}} gutter={[0, 0]}>
                                    <Col xs={24} sm={12} md={18}>
                                      <List.Item.Meta
                                        className={"list-meta-item"}
                                        avatar={<Avatar size={50} src={`${item.picture}`}/>}
                                        title={<p
                                          className={"gx-mb-0 list-item-header"}>{(item.fullname) ? `${item.fullname}` : `${item.username}`}</p>}
                                        description={<a href={`${item.url}`} target={"_blank"}
                                                        rel="noreferrer">{(item.username) ? `@${item.username}` : `${item.fullname}`}</a>}
                                      />
                                    </Col>
                                    <Col xs={12} sm={5} md={3}>
                                      <List.Item.Meta
                                        className={"gx-text-center list-mobile-margin"}
                                        title={<p className={"gx-mb-0 list-item-header"}>
                                          {renderSwitch(item.followers.toString())}
                                        </p>}
                                        description={
                                          <p className="text-muted" style={{fontSize: 14, marginBottom: 0}}>
                                            Takip??i
                                          </p>
                                        }
                                      />
                                    </Col>
                                    <Col xs={12} sm={7} md={3}>
                                      <List.Item.Meta
                                        className={"list-mobile-margin"}
                                        title={<p className={"gx-mb-0 list-item-header"}>
                                          {renderSwitch(item.engagements.toString())}
                                        </p>}
                                        description={
                                          <p className="gx-text-grey" style={{fontSize: 14, marginBottom: 0}}>
                                            Etkile??im
                                          </p>
                                        }
                                      />
                                    </Col>
                                  </Row>
                                </List.Item>
                              )}
                            />
                            }
                          </Col>
                        </Row>
                      </div>
                      <div className="gx-mt-5">
                        <Row gutter={[10, 10]}>
                          <Col xs={24} sm={24}>
                            <p className={"detail-title-item"}>Be??enenlerin referans kullan??c??lar?? (Notable likers)</p>
                          </Col>
                          <Col xs={24} sm={24}>
                            {reportData.profile.audienceLikers.notableUsers &&
                            <List
                              className="list-item list-item-detail-page gx-mt-2"
                              itemLayout="horizontal"
                              locale={{emptyText: 'Veri Yok'}}
                              bordered={true}
                              size={'large'}
                              dataSource={reportData.profile.audienceLikers.notableUsers.slice(0, 15)}
                              column={4}
                              renderItem={(item, index) => (
                                <List.Item
                                  key={`list-likers-${index}`}
                                  className={`list-item-likers-${index}`}>
                                  <Row style={{width: '100%'}} gutter={[0, 0]}>
                                    <Col xs={24} sm={12} md={18}>
                                      <List.Item.Meta
                                        className={"list-meta-item"}
                                        avatar={<Avatar size={50} src={`${item.picture}`}/>}
                                        title={
                                          <p
                                            className={"gx-mb-0 list-item-header"}>{(item.fullname) ? `${item.fullname}` : `${item.username}`}</p>}
                                        description={<a href={`${item.url}`} target={"_blank"}
                                                        rel="noreferrer">{(item.username) ? `@${item.username}` : `${item.fullname}`}</a>}
                                      />
                                    </Col>
                                    <Col xs={12} sm={5} md={3}>
                                      <List.Item.Meta
                                        className={"gx-text-center list-mobile-margin"}
                                        title={<p className={"gx-mb-0 list-item-header"}>
                                          {renderSwitch(item.followers.toString())}
                                        </p>}
                                        description={
                                          <p className="text-muted" style={{fontSize: 14, marginBottom: 0}}>
                                            Takip??i
                                          </p>
                                        }
                                      />
                                    </Col>
                                    <Col xs={12} sm={7} md={3}>
                                      <List.Item.Meta
                                        className={"list-mobile-margin"}
                                        title={<p className={"gx-mb-0 list-item-header"}>
                                          {renderSwitch(item.engagements.toString())}
                                        </p>}
                                        description={
                                          <p className="gx-text-grey" style={{fontSize: 14, marginBottom: 0}}>
                                            Etkile??im
                                          </p>
                                        }
                                      />
                                    </Col>
                                  </Row>
                                </List.Item>
                              )}
                            />
                            }
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Layout>
      <NavbarPage />
      <BodyContent />
      <ScrollUpButton
        ContainerClassName="classForContainer"
        style={{ height: 36, width: 36 }}
        TransitionClassName="classForTransition"
      >
        <CustomDot />
      </ScrollUpButton>
      {/* </div> */}
    </Layout>
  )
}


export default SampleReport;

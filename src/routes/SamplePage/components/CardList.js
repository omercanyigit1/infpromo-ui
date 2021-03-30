import React from 'react';
import {Row, Col, Button, Space, Divider} from 'antd';
import icon from './../../../assets/images/icon.png';

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

const CardList = ({avatar, name, userName, follower, url, engagement, engagementRate, report, onClick}) => {

  return (
    <div className={"list-item"}>
      <Row justify="center" align="middle" gutter={[10, 10]}>
        <Col xs={20} md={9}>
          <div className={"gx-d-flex"}>
            {avatar && <img alt="..." src={avatar} className="gx-avatar-img gx-border-0"/>}
            {!avatar && <img alt="..." src={icon} className="gx-avatar-img gx-border-0"/>}
            <div style={{marginLeft: 15}}>
              <h6 className={"gx-mb-0"}>{name}</h6>
              <a href={`${url}`} target={"_blank"} rel="noreferrer">@{userName}</a>
            </div>
          </div>
        </Col>
        <Col xs={12} md={3}>
          <h5 className={"gx-mb-0"}>
            {renderSwitch(follower)}
          </h5>
          <p className="text-muted" style={{fontSize: 14, marginBottom: 0}}>
            Takipçi
          </p>
        </Col>
        <Col xs={12} md={4}>
          <h5 className={"gx-mb-0"}>
            {engagement.substring(0, 3)}k
            ({parseFloat(engagementRate * 100).toFixed(2)} %)
          </h5>
          <p className="gx-text-grey" style={{fontSize: 14, marginBottom: 0}}>
            Etkileşimler ve Oranı
          </p>
        </Col>
        <Col xs={24} md={7}>
          <div className={"text-md-right"}>
            <div>
              <Space split={<Divider type="vertical" />}>
                <Button className="btn btn-secondary" onClick={onClick}>
                  <span>Detaylı Rapor Al</span>
                </Button>
                <a href={`${report}`} target={"_blank"}>Rapor Örneği</a>
              </Space>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CardList;

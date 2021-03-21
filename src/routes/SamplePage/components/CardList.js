import React from 'react';
import {Row, Col} from 'antd';
import {Link} from 'react-router-dom';

const CardList = ({avatar, name, userName, follower, url, engagement, engagementRate, onClick, pdfUrl}) => {
  return (
    <div className={"list-item"}>
      <Row justify="center" align="middle" gutter={[10, 10]}>
        <Col xs={4} md={2}>
          <img alt="..." src={avatar} className="gx-avatar-img gx-border-0"/>
        </Col>
        <Col xs={20} md={7}>
          <h4 className={"gx-mb-0"}>{name}</h4>
          <a href={`${url}`} target={"_blank"}>@{userName}</a>
        </Col>
        <Col xs={12} md={4}>
          <h4 className={"gx-mb-0"}>{follower}k</h4>
          <p className="text-muted">
            Takipçi
          </p>
        </Col>
        <Col xs={12} md={5}>
          <h4 className={"gx-mb-0"}>{engagement} <small>({engagementRate} %)</small></h4>
          <p className="gx-text-grey">
            Etkileşimler ve Oranı
          </p>
        </Col>
        <Col xs={24} md={5}>
          <div className={"text-md-right"}>
            <a href={`${pdfUrl}`} className="btn btn-secondary" onClick={onClick} download>
              <span>Rapor Al (2 Kredi)</span>
            </a>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CardList;

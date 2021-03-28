import React from 'react';
import {Row, Col, List, Button, message} from 'antd';
import { PDFDownloadLink } from '@react-pdf/renderer'
import icon from './../../../assets/images/icon.png';
//import ButtonEl from "./ButtonEl";
import {connect} from 'react-redux';
import {postGeneratePdf, isLoggedIn} from "../../../appRedux/actions";

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

const CardList = ({postGeneratePdf, avatar, name, userName, follower, url, engagement, engagementRate, documentFile, reportDataLoading, credit, network, userId, reportData}) => {

  function handleGeneratePdf(id) {
    if (credit < 2) {
      message.error(`Yetersiz Bakiye`);
    } else {
      postGeneratePdf(id, network);
    }
  }

  return (
    <div className={"list-item"}>
      <Row justify="center" align="middle" gutter={[10, 10]}>
        <Col xs={4} md={2}>
          {avatar && <img alt="..." src={avatar} className="gx-avatar-img gx-border-0"/>}
          {!avatar && <img alt="..." src={icon} className="gx-avatar-img gx-border-0"/>}
        </Col>
        <Col xs={20} md={7}>
          <h6 className={"gx-mb-0"}>{name}</h6>
          <a href={`${url}`} target={"_blank"} rel="noreferrer">@{userName}</a>
        </Col>
        <Col xs={12} md={4}>
          <h5 className={"gx-mb-0"}>
            {renderSwitch(follower)}
          </h5>
          <p className="text-muted" style={{fontSize: 14, marginBottom: 0}}>
            Takipçi
          </p>
        </Col>
        <Col xs={12} md={5}>
          <h5 className={"gx-mb-0"}>
            {engagement.substring(0, 3)}k
            ({parseFloat(engagementRate * 100).toFixed(2)} %)
          </h5>
          <p className="gx-text-grey" style={{fontSize: 14, marginBottom: 0}}>
            Etkileşimler ve Oranı
          </p>
        </Col>
        <Col xs={24} md={5}>
          <div className={"text-md-right"}>
            <div>
              <Button className="btn btn-secondary" onClick={() => {
                handleGeneratePdf(userId)
              }}>
                <span>Rapor Al (2 Kredi)</span>
              </Button>
              {!reportDataLoading &&
              <PDFDownloadLink document={documentFile} filename={`${userName}-report.pdf`}>
                {({ blob, url, loading, error }) => (loading ? <a href={'#'}>Hazırlanıyor</a> :<a href={url} download>Rapor Hazır</a>)}
              </PDFDownloadLink>
              }
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    reportData: state.list.reportData,
    reportDataLoading: state.list.reportDataLoading,
    loading: state.list.loading,
  }
}

export default connect(mapStateToProps, {postGeneratePdf, isLoggedIn})(CardList);

import React from 'react';
import {Row, Col, Statistic, Button, message, Table, Tag, Space} from 'antd';
import { PDFDownloadLink } from '@react-pdf/renderer'
import icon from './../../../assets/images/icon.png';
//import ButtonEl from "./ButtonEl";
import {connect} from 'react-redux';
import {postGeneratePdf, isLoggedIn} from "../../../appRedux/actions";

const { Column, ColumnGroup } = Table;

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

const CardListTable = ({data, postGeneratePdf, avatar, name, userName, follower, url, engagement, engagementRate, documentFile, reportDataLoading, credit, network, userId, reportData}) => {

  function handleGeneratePdf(id) {
    if (credit < 2) {
      message.error(`Yetersiz Bakiye`);
    } else {
      postGeneratePdf(id, network);
    }
  }

  return (
    <Table dataSource={data}>
      <Column title={null} dataIndex="avatar" key="avatar" />

      <Column
        title=""
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <a>Invite {record.lastName}</a>
            <a>Delete</a>
          </Space>
        )}
      />
      <Column title="" dataIndex="address" key="address" />
      <Column
        title=""
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <a>Invite {record.lastName}</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  )
}

const mapStateToProps = (state) => {
  return {
    reportData: state.list.reportData,
    reportDataLoading: state.list.reportDataLoading,
    loading: state.list.loading,
  }
}

export default connect(mapStateToProps, {postGeneratePdf, isLoggedIn})(CardListTable);

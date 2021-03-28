import {Button} from "antd";
import {PDFDownloadLink} from "@react-pdf/renderer";
import React from "react";

const ButtonEl = ({reportDataLoading, userName, onClick, documentFile}) => {
  console.log("document: ", documentFile);

  return (
    <div>
      <Button className="btn btn-secondary" onClick={onClick}>
        <span>Rapor Al (2 Kredi)</span>
      </Button>
      {!reportDataLoading &&
      <PDFDownloadLink document={documentFile} filename={`${userName}-report.pdf`}>
        {({ blob, url, loading, error }) => (loading ? <a href={'#'}>Hazırlanıyor</a> :<a href={url} download>Rapor Hazır</a>)}
      </PDFDownloadLink>
      }
    </div>
  )
}

export default ButtonEl;

import React from 'react';
import {Card, Result, Spin} from "antd";

const PaymentErrorPage = (props) => {
  return (
    <Spin spinning={false}>
      <div>
        <div className="title-heading gx-mb-5">
          <h3 className="title mb-1">
            Ödeme Sayfası
          </h3>
          <p className="text-muted">
            Ödemenizin sonucunu burdan görebilirsiniz.
          </p>
        </div>
        <Card title={`Ödemenizin Sonucu`}>
          <Result
            status="error"
            title="Ödeme Başarısız."
            subTitle="Ödemeniz kabul edilmedi..."
            extra={null}
          />
        </Card>
      </div>
    </Spin>
  )
}

export default PaymentErrorPage;

import React, {useEffect, useState} from 'react';
import {Card, Input, InputNumber, Row, Col, Button} from 'antd';

const CreditPage = () => {
  const [value, setValue] = useState(null);

  useEffect(() => {

  }, [value])

  function onChange(value) {
    setValue(value);
  }

  return (
    <div>

      <div className="title-heading gx-mb-5">
        <h3 className="title mb-1">
          Hemen Kredi Yükle
        </h3>
        <p className="text-muted">
          Arama yapmak ve güncel raporları takip edebilmek için hızlıca kredi yükleyebilirsiniz.
        </p>
      </div>
      <Card title={"Hızlıca Kredi Yükleyin"}>
        <Row>
          <Col span={24}>
            {value &&
            <div className={"gx-mb-5 gx-mt-3"}>
              <h3>{value} Arama İmkanı - {value / 2} Raporlama</h3>
            </div>
            }
            {!value &&
            <div className={"gx-mb-5 gx-mt-3"}>
              <h3>0 Arama İmkanı - 0 Raporlama</h3>
            </div>
            }
          </Col>
        </Row>

        <Row gutter={[10, 10]} align={"top"}>
          <Col span={8}>
            <p style={{marginBottom: 5}}>Kredi Miktarı:</p>
            <InputNumber keyboard={true} min={0} max={100} style={{width: '50%'}} placeholder={"Miktar"} onChange={onChange} />
          </Col>
          <Col span={8}>
            <p style={{marginBottom: 0}}>Ödenecek Tutar:</p>
            <h3>
              <b>{value} $ ({value} dolar)</b>
            </h3>
          </Col>
          <Col span={6}>
            <div>
              <p style={{marginBottom: 0}}>&nbsp;</p>
              <Button className={"btn btn-primary"}>
                Hemen Öde
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default CreditPage;

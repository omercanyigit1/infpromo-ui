import React, {useEffect} from "react";
import {Radio, Card, Select, Row, Col, Tooltip, Input, Spin, Button} from 'antd';
import {InfoCircleOutlined, SortDescendingOutlined} from '@ant-design/icons';
import debounce from 'lodash/debounce';
import CardList from "./components/CardList";

const {Option} = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const rate = [];
for (let i = 1; i < 21; i++) {
  rate.push(<Option key={i.toString(21) + i}>≥ {i} %</Option>);
}

function DebounceSelect({fetchOptions, debounceTimeout = 800, ...props}) {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const fetchRef = React.useRef(0);
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small"/> : null}
      {...props}
      options={options}
    />
  );
} // Usage of DebounceSelect

async function fetchUserList(username) {
  console.log('fetching user', username);
  return fetch('https://randomuser.me/api/?results=5')
    .then((response) => response.json())
    .then((body) =>
      body.results.map((user) => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.login.username,
      })),
    );
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

const SamplePage = () => {
  const [value, setValue] = React.useState([]);

  function handleFollowerFromChange(value) {
    console.log(`selected ${value}`);
  }

  function handleFollowerToChange(value) {
    console.log(`selected ${value}`);
  }

  function handleGenderChange(value) {
    console.log(`selected ${value}`);
  }

  function handleInterestsChange(value) {
    console.log(`selected ${value}`);
  }

  function handleLastPostChange(value) {
    console.log(`selected ${value}`);
  }

  function handleEngagementRateChange(value) {
    console.log(`selected ${value}`);
  }

  function handleBioChange(value) {
    console.log(`selected ${value}`);
  }

  function handleSortChange(value) {
    console.log(`selected ${value}`);
  }

  return (
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
        <Radio.Group defaultValue="instagram" buttonStyle="solid">
          <Radio.Button value="instagram">Instagram</Radio.Button>
          <Radio.Button value="youtube">Youtube</Radio.Button>
          <Radio.Button value="tiktok">Tiktok</Radio.Button>
        </Radio.Group>
      </div>

      <Card className={"gx-mt-3"} title={
        <CardTitle title={"Influencer Filtresi"}
                   subTitle={"Aramanızı daraltmak için takipçi sayısı ve kitle filtreleri ile başlamayı deneyin ya da kullanıcı adına göre arama yapın."}/>}
            extra={null} style={{width: '100%'}}>
        <Card type="inner" title="Influencer Özellikleri" extra={null}>
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
                      <Option value="jack">25.000</Option>
                      <Option value="lucy">50.000</Option>
                      <Option value="lucy">75.000</Option>
                      <Option value="Yiminghe">100.000</Option>
                      <Option value="Yiminghe">150.000</Option>
                      <Option value="Yiminghe">200.000</Option>
                      <Option value="Yiminghe">300.000</Option>
                      <Option value="Yiminghe">500.000</Option>
                      <Option value="Yiminghe">1.000.000</Option>
                    </Select>
                  </Col>
                  <Col span={12}>
                    <Select allowClear placeholder={"max"} style={{width: '100%'}}
                            onChange={handleFollowerToChange}>
                      <Option value="jack">25.000</Option>
                      <Option value="lucy">50.000</Option>
                      <Option value="lucy">75.000</Option>
                      <Option value="Yiminghe">100.000</Option>
                      <Option value="Yiminghe">150.000</Option>
                      <Option value="Yiminghe">200.000</Option>
                      <Option value="Yiminghe">300.000</Option>
                      <Option value="Yiminghe">500.000</Option>
                      <Option value="Yiminghe">1.000.000</Option>
                      <Option value="Yiminghe">1.000.000+</Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={4}>
                <Row gutter={[10, 10]}>
                  <Col span={24}>
                    <label>
                      <b>Cinsiyet:</b>
                    </label>
                  </Col>
                  <Col xs={24} md={24}>
                    <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}} onChange={handleGenderChange}>
                      <Option value="jack">Kadın</Option>
                      <Option value="lucy">Erkek</Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
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
                      {children}
                    </Select>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={4}>
                <Row gutter={[10, 10]}>
                  <Col span={24}>
                    <label>
                      <b>Dil:</b>
                    </label>
                  </Col>
                  <Col xs={24} md={24}>
                    <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}} onChange={handleGenderChange}>
                      <Option value="jack">Türkçe</Option>
                      <Option value="lucy">English</Option>
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
                      <b>Son Post:</b>
                    </label>
                  </Col>
                  <Col span={24}>
                    <Select allowClear placeholder={"Seçiniz"} style={{width: '100%'}}
                            onChange={handleLastPostChange}>
                      <Option value="jack">30 Gün</Option>
                      <Option value="jack">3 Ay</Option>
                      <Option value="jack">6 Ay</Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
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
                            onChange={handleEngagementRateChange}>
                      <Option value={"Email"}>
                        Email Adresi
                      </Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={6}>
                <Row gutter={[10, 10]}>
                  <Col span={24}>
                    <label>
                      <b>Bio:
                        <Tooltip title="prompt text">
                          <InfoCircleOutlined/>
                        </Tooltip>
                      </b>
                    </label>
                  </Col>
                  <Col span={24}>
                    <Input allowClear placeholder={"Seçiniz"} style={{width: '100%'}} onChange={handleBioChange}/>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24}>
                <div style={{textAlign: 'right'}} className={"gx-mt-3"}>
                  <Button className="btn btn-primary">
                    Filtrele
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
        <Card type="inner" title="Influencer Kullanıcı Adı" extra={null}>
          <div>
            <Row>
              <Col xs={24} md={24}>
                <Row gutter={[10, 10]}>
                  <Col span={24}>
                    <DebounceSelect
                      mode="multiple"
                      value={value}
                      placeholder="Select users"
                      fetchOptions={fetchUserList}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      style={{
                        width: '100%',
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col xs={24} sm={24}>
                <div style={{textAlign: 'right'}} className={"gx-mt-3"}>
                  <Button className="btn btn-primary">
                    Arama
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </Card>

      <div>
        <div className={"list-header-item"}>
          <Row>
            <Col span={24}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 30,
                marginTop: 10
              }}>
                <SortDescendingOutlined />
                <span style={{marginLeft: 5}}>Sıralama: </span>
                <Select defaultValue={"1"} placeholder={"Sıralama"} style={{ width: 150, marginLeft: 5 }} onChange={handleSortChange}>
                  <Option value="1">Seçiniz</Option>
                  <Option value="2">Takipçi Sayısı</Option>
                  <Option value="3">Etkileşim Oranı</Option>
                </Select>
                <hr/>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={9}>
              <p style={{marginBottom: 0}}><b>1</b> adet influencer bulundu.</p>
            </Col>
            <Col xs={12} md={4}>
              <p style={{marginBottom: 0}}>Takipçi Oranı</p>
            </Col>
            <Col xs={12} md={11}>
              <p style={{marginBottom: 0}}>Etkileşim (Etkileşim Oranı %)</p>
            </Col>
          </Row>
        </div>
        <CardList avatar={"https://via.placeholder.com/150x150"}
                  name={"Ömer Can Yiğit"}
                  userName={"@omercanyigit1"}
                  follower={"236"}
                  engagement={"31k"}
                  engagementRate={"1.23"}
        />

        <CardList avatar={"https://via.placeholder.com/150x150"}
                  name={"Ömer Can Yiğit"}
                  userName={"@omercanyigit1"}
                  follower={"236"}
                  engagement={"31k"}
                  engagementRate={"1.23"}
        />

        <CardList avatar={"https://via.placeholder.com/150x150"}
                  name={"Ömer Can Yiğit"}
                  userName={"@omercanyigit1"}
                  follower={"236"}
                  engagement={"31k"}
                  engagementRate={"1.23"}
        />

        <CardList avatar={"https://via.placeholder.com/150x150"}
                  name={"Ömer Can Yiğit"}
                  userName={"@omercanyigit1"}
                  follower={"236"}
                  engagement={"31k"}
                  engagementRate={"1.23"}
        />
      </div>

    </div>
  );
};

export default SamplePage;

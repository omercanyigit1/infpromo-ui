// React Basic and Bootstrap
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

// Import images
import saas1 from "../../assets/images/saas/filter-screen.png";
import saas2 from "../../assets/images/saas/list-screen.png";
import saas3 from "../../assets/images/saas/report.png";

//Import Components
import SectionTitleLeft from "../../components/Shared/SectionTitleLeft";

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [
        { title: "Tiktok, Youtube ve Instagram platformlarında arama" },
        { title: "20+ filtreleme seçeneği ile arama" },
        { title: "Kullanıcı adı ile arama" },
        { title: "Takipçi özelliklerine göre arama" },
        { title: "Influencerın ilgi alanlarına göre arama" },
        { title: "Kolay kullanım" },
      ],
      features2: [
        { title: "Etkileşim oranlarını ve toplamlarını görebilme" },
        { title: "Takipçi sayısına göre sıralanma" },
        { title: "Kolay kullanım"},
      ],
      features3: [
        { title: "Detaylı takipçi sayısı, beğeni, yorum grafikleri" },
        { title: "Influencerın en çok kullandığı #hashtagler" },
        { title: "Fake takipçi bilgisi" },
        { title: "Takipçilerin yaş aralıkları, cinsiyetleri, lokasyonları hakkındaki detaylı bilgileri ve grafikleri" },
        { title: "Influencerin en çok etkileşimde olduğu hesaplar" },
        { title: "Influencer ve takipçileri hakkında marka yakınlıkları" },
      ],
    };
  }
  render() {
    return (
      <React.Fragment>
        <Container className="mt-100 mt-60">
          <Row className="align-items-center">
            <Col lg={6} md={6}>
              <img src={saas1} className="img-fluid shadow rounded" alt="" />
            </Col>

            <Col lg={6} md={6} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title ml-lg-5">
                <SectionTitleLeft
                  title="Birçok özelliğe sahip kolay filtreleme"
                  desc="Infpromo’nun sizlere sunduğu çeşitli filtreme özellikleri ile, en uygun influencerla çalışma imkanını daha hızlı edinebilirsiniz."
                  features={this.state.features}
                  class=""
                />
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="mt-100 mt-60">
          <Row className="align-items-center">
            <Col
              lg={7}
              md={{ size: 6, order: 1 }}
              xs={{ order: 2 }}
              className="mt-4 mt-sm-0 pt-2 pt-sm-0"
            >
              <div className="section-title mr-lg-5">
                <SectionTitleLeft
                  title="25.000+ influencerın listelenmesi"
                  desc="Yalnızca 4 ₺ ödeyerek binlerce influencerın etkileşim toplamlarını ve oranlarını görebilirsiniz."
                  features={this.state.features2}
                  class=""
                />
              </div>
            </Col>
            <Col lg="5" md={{ size: 6, order: 2 }} xs={{ order: 1 }}>
              <img src={saas2} className="img-fluid shadow rounded" alt="" />
            </Col>
          </Row>
        </Container>
        <Container className="mt-100 mt-60">
          <Row className="align-items-center">
            <Col lg={6} md={6}>
              <img src={saas3} className="img-fluid shadow rounded" alt="" />
            </Col>
            <Col lg={6} md={6} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title ml-lg-5">
                <SectionTitleLeft
                  title="Detaylı rapor analizi"
                  desc="Yalnızca 8 ₺ ödeyerek hedeflediğiniz influencer hakkında anında detaylı rapor edinebilirsiniz. Bu rapor içerisinde;"
                  features={this.state.features3}
                  class=""
                />
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Start;

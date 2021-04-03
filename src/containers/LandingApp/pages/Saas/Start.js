// React Basic and Bootstrap
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

// Import images
import saas1 from "../../assets/images/saas/infpromo-filter-image.png";
import saas2 from "../../assets/images/saas/report-review.png";
import report from './../../../../assets/images/instagram-report.pdf';

//Import Components
import SectionTitleLeft from "../../components/Shared/SectionTitleLeft";

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [
        { title: "Tiktok, Youtube ve Instagram platformlarında arama yapabilme" },
        { title: "20+ filtreleme seçeneği" },
        { title: "Kullanıcı adı ile arama" },
        { title: "Takipçi özelliklerine göre arama" },
        { title: "Influencer 'ın ilgi alanlarına göre arama" },
        { title: "Kolay kullanım" },
      ],
      features2: [
        { title: "Son 7 aya sahip etkileşim grafiği" },
        { title: "Detaylı takipçi sayısı grafiği" },
        { title: "Influencer' ın en çok kullandığı taglar (#hastags)" },
        { title: "Takipçilerin lokasyon bilgisi" },
        { title: "Takipçilerin yaş aralığı ve cinsiyetleri hakkında oranlar" },
        { title: "Influencer 'ın en çok etkileşim içinde olduğu hesaplar" },
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
                  title="Bir çok özelliğe sahip kolay filtreleme"
                  desc="Infpromo nun sizlere sunduğu çeşitli filtreme özellikleriyle, en uygun influencer ile çalışma imkanını daha hızlı edinebilirsiniz."
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
                  title="Detaylı Rapor Analizi"
                  desc="Yalnızca 2$ ödeyerek hedeflediğiniz Influencer hakkında detaylı rapor edinebilirsiniz. Bu rapor içerisinde;"
                  features={this.state.features2}
                  class=""
                />
                <a href={report} target={"_blank"} rel="noreferrer" className="mt-3 h6 text-primary">
                  Rapor Örneği <i className="mdi mdi-chevron-right" />
                </a>
              </div>
            </Col>

            <Col lg="5" md={{ size: 6, order: 2 }} xs={{ order: 1 }}>
              <img src={saas2} className="img-fluid shadow rounded" alt="" />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Start;

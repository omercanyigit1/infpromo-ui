// React Basic and Bootstrap
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

// Import images
import user from "../../assets/images/icon/user.svg";
import calendar from "../../assets/images/icon/calendar.svg";
import sandClock from "../../assets/images/icon/sand-clock.svg";

//Import Images
import img1 from "../../assets/images/client/instagram.png";
import img2 from "../../assets/images/client/youtube.png";
import img3 from "../../assets/images/client/tiktok.png";

// Import Generic Components
import Section from "./Section";
import SectionTitle from "../../components/Shared/SectionTitle";
import Feature from "../../components/Shared/Feature";
import Start from "./Start";
import Client from "./Client";
import PricingList from "../../../../routes/CreditPage/components/PricingList";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [
        { image: img1 },
        { image: img2 },
        { image: img3 },
      ],
    };
  }

  componentDidMount() {
    document.body.classList = "";
    window.addEventListener("scroll", this.scrollNavigation, true);

    var featureBox = document.getElementsByClassName("features");
    for (var i = 0; i < featureBox.length; i++) {
      featureBox[i].classList.remove("mt-5");
    }
  }

  // Make sure to remove the DOM listener when the component is unmounted.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavigation, true);
  }

  scrollNavigation = () => {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 80) {
      document.getElementById("topnav").classList.add("nav-sticky");
    } else {
      document.getElementById("topnav").classList.remove("nav-sticky");
    }
  };

  render() {
    const featureArray = [
      {
        id: 1,
        icon: "uil uil-airplay h1 text-primary",
        title: "Kolay Kullanım",
        description:
          "Geniş filtre özelliğimiz ile Türkiye'deki tüm influencer ağına erişebilirsiniz.",
        imgUrl: user,
      },
      {
        id: 2,
        icon: "uil uil-calendar-alt h1 text-primary",
        title: "Detaylı Rapor",
        description:
          "Influencer etkileşimi hakkında detaylı rapor edinebilirsiniz.",
        imgUrl: calendar,
      },
      {
        id: 3,
        icon: "uil uil-clock h1 text-primary",
        title: "Gerçek ve Güncel Veriler",
        description:
          "Verilerin hepsi influencerların güncel verileridir.",
        imgUrl: sandClock,
      },
    ];

    return (
      <React.Fragment>
        {/* section */}
        <Section />

        {/* Partner */}
        <section className="section bg-light mt-0 mt-md-5">
          <Container>
            {/* section title */}
            <SectionTitle
              title="Arama yapabileceğiniz platformlar"
              desc="Dünyanın en popüler sosyal medya platformlarındaki 50.000’den fazla Türk influencerı keşfedebilirsiniz."
            />

            {/* partners */}
            <Row className="justify-content-center">
              {this.state.partners.map((partner, key) => (
                <Col
                  lg={2}
                  md={2}
                  xs={6}
                  key={key}
                  className="text-center mt-4 pt-2"
                >
                  <img
                    src={partner.image}
                    className="avatar avatar-ex-sm"
                    alt="infpromo"
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Feature */}
        <section className="section">
          <Container>
            <Feature featureArray={featureArray} isCenter={false} />
          </Container>

          {/* Start */}
          <Start />

          <Container className="pb-lg-4 mb-md-5 mb-4 mt-100 mt-60">

            <Row>
              <Col xs={12} md={12}>
                <SectionTitle
                  title="Fiyatlandırma"
                  desc="Siz de çok uygun fiyatlarla bu raporlara ulaşabilir ve çalışmak istediğiniz influencer hakkındaki tüm detayları öğrenebilirsiniz."
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={4}>
                <PricingList
                  title="5"
                  desc="20"
                  features={[
                    { title: "5 Arama İmkanı" },
                    { title: "2 Detaylı Rapor" },
                  ]}
                />
              </Col>
              <Col xs={12} md={4}>
                <PricingList
                  title="15"
                  desc="40"
                  features={[
                    { title: "15 Arama İmkanı" },
                    { title: "7 Detaylı Rapor" },
                  ]}
                />
              </Col>
              <Col xs={12} md={4}>
                <PricingList
                  title="30"
                  desc="80"
                  features={[
                    { title: "30 Arama İmkanı" },
                    { title: "15 Detaylı Rapor" },
                  ]}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={4}>
                <PricingList
                  title="65"
                  desc="150"
                  features={[
                    { title: "65 Arama İmkanı" },
                    { title: "30 Detaylı Rapor" },
                  ]}
                />
              </Col>
              <Col xs={12} md={4}>
                <PricingList
                  title="165"
                  desc="350"
                  features={[
                    { title: "165 Arama İmkanı" },
                    { title: "82 Detaylı Rapor" },
                  ]}
                />
              </Col>
              <Col xs={12} md={4}>
                <PricingList
                  title="350"
                  desc="700"
                  features={[
                    { title: "350 Arama İmkanı" },
                    { title: "175 Detaylı Rapor" },
                  ]}
                />
              </Col>
            </Row>

          </Container>

          {/* Client */}
          <Client />
        </section>

        <div className="position-relative">
          <div className="shape overflow-hidden text-footer">
            <svg viewBox="0 0 2880 250" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M720 125L2160 0H2880V250H0V125H720Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Index;

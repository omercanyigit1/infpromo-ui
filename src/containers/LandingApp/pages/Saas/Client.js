// React Basic and Bootstrap
import React, {Component} from "react";
import {Container, Row, Col} from "reactstrap";
import {Link} from "react-router-dom";

//Import Containers
import ReviewsSlider from "../../components/Shared/ReviewsSlider";

//Import Images
import img1 from "../../assets/images/client/01.jpg";
import img2 from "../../assets/images/client/02.jpg";
import img3 from "../../assets/images/client/03.jpg";
import img4 from "../../assets/images/client/04.jpg";
import img5 from "../../assets/images/client/05.jpg";
import img6 from "../../assets/images/client/06.jpg";

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [
        {
          id: 1,
          img: img1,
          name: "Thomas Israel",
          post: "C.E.O",
          desc:
            "It seems that only fragments of the original text remain in the Lorem Ipsum texts used today.",
          rating: 5,
        },
        {
          id: 2,
          img: img2,
          name: "Barbara McIntosh",
          post: "M.D",
          desc:
            "One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others.",
          rating: 4,
        },
        {
          id: 3,
          img: img3,
          name: "Carl Oliver",
          post: "P.A",
          desc:
            "The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century.",
          rating: 3,
        },
        {
          id: 4,
          img: img4,
          name: "Christa Smith",
          post: "Manager",
          desc:
            "According to most sources, Lorum Ipsum can be traced back to a text composed by Cicero.",
          rating: 5,
        },
        {
          id: 5,
          img: img5,
          name: "Dean Tolle",
          post: "Developer",
          desc:
            "There is now an abundance of readable dummy texts. These are usually used when a text is required.",
          rating: 5,
        },
        {
          id: 6,
          img: img6,
          name: "ill Webb",
          post: "Designer",
          desc:
            "Thus, Lorem Ipsum has only limited suitability as a visual filler for German texts.",
          rating: 4,
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <Container className="pb-lg-4 mb-md-5 mb-4 mt-100 mt-60">
          <Row className="justify-content-center">
            <Col xs="12" className="text-center">
              <div className="section-title">
                <h4 className="title mb-4">
                  İhtiyacınız olan herşeyi ücretsiz denemek ister misiniz?
                </h4>
                <p className="text-muted para-desc mx-auto mb-0">
                  Sizde{" "}
                  <span className="text-primary font-weight-bold">
                    infpromo
                  </span>{" "}
                  ile Türkiye'de ki tüm Influencer etkileşim oranlarını ve detaylı etkileşim raporlarını{" "}
                  <span className="text-primary font-weight-bold">
                    ücretsiz
                  </span>{" "}
                  ve{" "}
                  <span className="text-primary font-weight-bold">
                    hızlıca
                  </span>{" "}
                  deneyebilirsiniz.
                </p>

                <div className="mt-4">
                  <Link to={'/register'} className="btn btn-primary mt-2 mr-2">
                    Ücretsiz Dene
                  </Link>
                  <Link to={'login'} className="btn btn-outline-primary mt-2">
                    Giriş Yap
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Client;

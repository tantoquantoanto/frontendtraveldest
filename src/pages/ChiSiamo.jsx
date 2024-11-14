import "./pagescss/chisiamo.css"
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const ChiSiamo = () => {
  return (
    <>
      <NavBar />
      <Container fluid className="chi-siamo-page py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="text-center">
            <h1 className="chi-siamo-title mb-4">Chi Siamo</h1>
            <p className="chi-siamo-description mb-5">
              Siamo appassionati di viaggi e crediamo che ogni destinazione racconti una storia unica. La nostra piattaforma ti offre una raccolta di recensioni reali, 
              scritte da viaggiatori come te, per aiutarti a scoprire i luoghi più autentici e le esperienze indimenticabili.
            </p>
            <p className="chi-siamo-description mb-5">
              Dalla montagna al mare, dalle città d'arte ai borghi nascosti, il nostro obiettivo è ispirarti e fornirti consigli utili per organizzare la tua prossima avventura. 
              Unisciti alla nostra comunità e condividi anche tu i tuoi viaggi!
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ChiSiamo;

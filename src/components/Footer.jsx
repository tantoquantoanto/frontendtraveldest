import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  LucideFacebook,
  LucideInstagram,
  LucideTwitter,
  LucideGithub,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-5 mt-5 border-top">
      <Container>
        <Row className="d-flex align-items-center justify-content-center">
          <Col sm={12} md={8} className="text-center">
            <h3 className="display-5 mb-4 text-primary">TravelDest</h3>
            <ul className="list-unstyled d-flex gap-3 justify-content-center mb-4">
              <li>
                <Link to="/chisiamo" className="text-dark text-decoration-none">Chi Siamo</Link>
              </li>
              <li>
                <Link to="/contatti" className="text-dark text-decoration-none">Contatti</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-dark text-decoration-none">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-dark text-decoration-none">Destinazioni</Link>
              </li>
            </ul>
            <p className="mb-4 text-muted">
              Esplora il mondo con TravelDest, dove le migliori recensioni ti aiutano a trovare la tua prossima destinazione da sogno.
            </p>
            <div className="d-flex gap-4 justify-content-center">
              <a href="https://facebook.com" className="text-primary">
                <LucideFacebook size={28} />
              </a>
              <a href="https://twitter.com" className="text-primary">
                <LucideTwitter size={28} />
              </a>
              <a href="https://instagram.com" className="text-primary">
                <LucideInstagram size={28} />
              </a>
              <a href="https://github.com" className="text-primary">
                <LucideGithub size={28} />
              </a>
            </div>
            <p className="mt-4 text-muted">&copy; 2024 TravelDest. Tutti i diritti riservati.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

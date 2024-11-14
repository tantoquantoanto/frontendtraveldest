import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "./pagescss/notfound.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <Container fluid className="not-found-page py-5">
        <Row className="justify-content-center text-center">
          <Col md={6} className="not-found-content">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-description">
              La pagina che stai cercando non esiste o è stata rimossa.
            </p>
            <Button variant="primary" onClick={handleGoHome} className="mt-4">
              Torna alla Home
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default NotFoundPage;

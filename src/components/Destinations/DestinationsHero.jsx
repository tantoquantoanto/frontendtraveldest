import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../componentscss/destinationsHero.css";
import { useAllDestinations } from "../../../hooks/useAllDestinations";
import RotateLoaderComponent from "../Loaders/RotateLoaderComponent";


const DestinationsHero = () => {
    const { allDestinations, loading, error } = useAllDestinations();
    const [randomDestination, setRandomDestination] = useState(null);
    const randomIndex = Math.floor(Math.random() * allDestinations.length);
    const makeItRandom = allDestinations[randomIndex];

    useEffect(() => {
        if (allDestinations && allDestinations.length > 0 && !randomDestination) {
            setRandomDestination(makeItRandom);
        }
    }, [allDestinations]);

    if (loading) {
        return (
           <RotateLoaderComponent/>
        );
    }

    if (error) {
        return (
            <Container className="destinations-hero my-4">
                <Row className="justify-content-center">
                    <Col md={12} className="text-center">
                        <h3>Error loading destinations: {error}</h3>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (!randomDestination) {
        return (
            <Container className="destinations-hero my-4">
                <Row className="justify-content-center">
                    <Col md={12} className="text-center">
                        <h3>No destinations available</h3>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="destinations-hero my-4">
            <Row className="justify-content-center">
                <Col md={12} className="text-center">
                    <Card className="bg-dark text-white border-0 hero-card">
                        <div
                            className="hero-img-container"
                            style={{ backgroundImage: `url(${randomDestination.img})` }}
                        >
                            <div className="card-img-overlay d-flex flex-column justify-content-center text-overlay">
                                <Card.Title className="display-3">{randomDestination.name}</Card.Title>
                                <Card.Text className="lead">
                                    {randomDestination.description}
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    href={`/destinations/${randomDestination._id}`}
                                    className="hero-button"
                                >
                                    Scopri di più
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
    
    
};

export default DestinationsHero;

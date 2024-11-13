import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import DestinationsHero from "../components/Destinations/DestinationsHero";
import { Col, Container, Row } from "react-bootstrap";
import DestinationCard from "../components/Destinations/DestinationCard";
import ResponsivePagination from "react-responsive-pagination";
import Footer from "../components/Footer";
import { useApprovedDestinations } from "../../hooks/useApprovedDestinations";

const OpenDestinationsPage = () => {
  const [searchResults, setSearchResults] = useState(null);
  const {
    approvedDestinations,
    approvedPage,
    setApprovedPage,
    totalApprovedPages,
    searchApprovedDestinationsByName,
  } = useApprovedDestinations();

  const handleSearch = async (name) => {
    setSearchResults([]); 
    const results = await searchApprovedDestinationsByName(name);
    setSearchResults(results); 
  };

  
  const destinationsToDisplay = searchResults || approvedDestinations;

  return (
    <>
      <NavBar onSearch={handleSearch} />
      <DestinationsHero />
      <Container className="py-4">
        <Row>
          {destinationsToDisplay.map((destination) => (
            <Col md={4} key={destination._id} className="mb-3">
              <DestinationCard
                img={destination.img}
                name={destination.name}
                location={destination.location}
                category={destination.category}
                id={destination._id}
              />
            </Col>
          ))}
        </Row>
        <Row className="mt-4 justify-content-center">
          <ResponsivePagination
            current={approvedPage}
            total={totalApprovedPages}
            onPageChange={setApprovedPage}
          />
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default OpenDestinationsPage;

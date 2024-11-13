import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useApprovedDestinations } from "../hooks/useApprovedDestinations";
import { useNotApprovedDestinations } from "../hooks/useNotApprovedDestinations";
import NavBar from "./components/NavBar";
import DestinationCard from "./components/Destinations/DestinationCard";
import DestinationsHero from "./components/Destinations/DestinationsHero";
import Footer from "./components/Footer";
import ResponsivePagination from "react-responsive-pagination";
import useSession from "../hooks/useSession";

const DestinationsPage = () => {
  const {
    approvedDestinations,
    approvedPage,
    setApprovedPage,
    totalApprovedPages,
    searchApprovedDestinationsByName,
    resetApprovedDestinations,
  } = useApprovedDestinations();
  const {
    notApprovedDestinations,
    notApprovedPage,
    setNotApprovedPage,
    totalNotApprovedPages,
    searchNotApprovedDestinationsByName,
    resetNotApprovedDestinations,
    getNotApprovedDestinationsFromApi,
  } = useNotApprovedDestinations();
  const session = useSession();
  const isAdmin = session.role === "admin";
  const [showApproved, setShowApproved] = useState(true);
  const [likedDestinations, setLikedDestinations] = useState([]);
  const currentPage = showApproved ? approvedPage : notApprovedPage;
  const totalPages = showApproved ? totalApprovedPages : totalNotApprovedPages;
  const setPage = showApproved ? setApprovedPage : setNotApprovedPage;
  const token = localStorage.getItem("Authorization");

  const fetchLikedDestinations = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/${session.userId}/liked-destinations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setLikedDestinations(data.destinations.map((d) => d._id));
      } else {
        console.error("Errore nel recupero delle destinazioni preferite");
      }
    } catch (error) {
      console.error("Errore di rete:", error);
    }
  };

  const postLikedDestinations = async (destinationId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/${session.userId}/like/${destinationId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setLikedDestinations((prev) => [...prev, destinationId]);
      } else {
        console.error("Errore nell'aggiunta ai preferiti");
      }
    } catch (error) {
      console.error("Errore di rete:", error);
    }
  };

  const deleteLikedDestinations = async (destinationId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/${session.userId}/like/${destinationId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setLikedDestinations((prev) =>
          prev.filter((id) => id !== destinationId)
        );
      } else {
        console.error("Errore nella rimozione dai preferiti");
      }
    } catch (error) {
      console.error("Errore di rete:", error);
    }
  };

  const handleLikeToggle = (destinationId) => {
    if (likedDestinations.includes(destinationId)) {
      deleteLikedDestinations(destinationId);
    } else {
      postLikedDestinations(destinationId);
    }
  };

  const handleSearch = (name) => {
    const reset = showApproved
      ? resetApprovedDestinations
      : resetNotApprovedDestinations;
    const search = showApproved
      ? searchApprovedDestinationsByName
      : searchNotApprovedDestinationsByName;

    reset();
    search(name);
  };

  useEffect(() => {
    if (session.userId) {
      fetchLikedDestinations();
    }
  }, [session.userId]);

  useEffect(() => {
    if (!showApproved && isAdmin) {
      getNotApprovedDestinationsFromApi();
    }
  }, [showApproved, isAdmin]);

  return (
    <>
      <NavBar setShowApproved={setShowApproved} onSearch={handleSearch} />
      {!isAdmin && <DestinationsHero />}
      <Container className="py-4">
        <Row>
          {isAdmin ? (
            <Col md={12}>
              <h2>
                {showApproved
                  ? "Destinazioni Approvate"
                  : "Destinazioni Non Approvate"}
              </h2>
              <Row>
                {(showApproved ? approvedDestinations : notApprovedDestinations).map((destination) => (
                  <Col xs={12} md={4} key={destination._id} className="mb-3">
                    <DestinationCard
                      img={destination.img}
                      name={destination.name}
                      location={destination.location}
                      category={destination.category}
                      id={destination._id}
                      isLiked={likedDestinations.includes(destination._id)}
                      onLikeToggle={handleLikeToggle}
                    />
                  </Col>
                ))}
              </Row>
              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setPage}
              />
            </Col>
          ) : (
            <Col md={12}>
              <Row>
                {approvedDestinations.map((destination) => (
                  <Col md={4} key={destination._id} className="mb-3">
                    <DestinationCard
                      img={destination.img}
                      name={destination.name}
                      location={destination.location}
                      category={destination.category}
                      id={destination._id}
                      isLiked={likedDestinations.includes(destination._id)}
                      onLikeToggle={handleLikeToggle}
                    />
                  </Col>
                ))}
              </Row>
              <ResponsivePagination
                current={approvedPage}
                total={totalApprovedPages}
                onPageChange={setApprovedPage}
              />
            </Col>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default DestinationsPage;

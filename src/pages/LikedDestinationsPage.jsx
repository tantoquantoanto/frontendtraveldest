import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Heart } from "lucide-react"; 
import DestinationCard from "../components/Destinations/DestinationCard"; 
import { useNavigate } from "react-router-dom"; 
import useSession from "../../hooks/useSession";
import NavBar from "../components/NavBar"
import RotateLoaderComponent from "../components/Loaders/RotateLoaderComponent";
import Footer from "../components/Footer";

const LikedDestinationsPage = () => {
  const [likedDestinations, setLikedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const session = useSession();
  const userId = session?.userId;
  const token = localStorage.getItem("Authorization");
  const navigate = useNavigate(); 

 
  const getLikedDestinations = async () => {
    try {
      setLoading(true);
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/users/${userId}/liked-destinations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch liked destinations.");
      }

      const data = await response.json();
      setLikedDestinations(data.destinations); 
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred while fetching your liked destinations.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleLikeToggle = async (destinationId) => {
    try {
      const isLiked = likedDestinations.some((dest) => dest._id === destinationId);

      if (isLiked) {
        
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/users/${userId}/like/${destinationId}`,
          { method: "DELETE", headers: { "Content-Type": "application/json" } }
        );
        
        if (response.ok) {
          setLikedDestinations(likedDestinations.filter((dest) => dest._id !== destinationId));
        }
      } else {
        
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/users/${userId}/like/${destinationId}`,
          { method: "POST", headers: { "Content-Type": "application/json" } }
        );

        if (response.ok) {
          const updatedLikedDestinations = await response.json();
          setLikedDestinations(updatedLikedDestinations.likedDestinations);
        }
      }
    } catch (error) {
      console.error("Errore nella gestione dei like:", error);
    }
  };

  
  useEffect(() => {
    if (userId) {
      getLikedDestinations();
    } else {
      navigate("/login");
    }
  }, [userId, navigate]); 

  if (loading) {
    return (
     <RotateLoaderComponent/>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <h4>Error:</h4>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <>
    <NavBar/>
    <Container className="py-4">
      <h2 className="mb-5 display-5 shadow-sm" >Your Favourite Destinations <Heart color="#ff0000" size={28} /></h2>
      <Row>
        {likedDestinations.length > 0 ? (
          likedDestinations.map((destination) => (
            <Col xs={12} md={4} key={destination._id} className="mb-3">
              <DestinationCard
                img={destination.img}
                name={destination.name}
                location={destination.location}
                category={destination.category}
                id={destination._id}
                isLiked={true} 
                onLikeToggle={() => handleLikeToggle(destination._id)}
              />
            </Col>
          ))
        ) : (
          <p>No liked destinations found.</p>
        )}
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default LikedDestinationsPage;

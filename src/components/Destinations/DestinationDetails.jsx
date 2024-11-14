import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DestinationsEditingModal from "../Destinations/DestinationsEditingModal";
import useSession from "../../../hooks/useSession";
import Swal from "sweetalert2";
import Footer from "../Footer";
import NavBar from "../NavBar";
import CreateReviewModal from "../Reviews/CreateReviewModal";
import "../componentscss/destinationDetails.css";
import { useSingleDestination } from "../../../hooks/useSingleDestination";
import RotateLoaderComponent from "../Loaders/RotateLoaderComponent";
import { useApprovedDestinations } from "../../../hooks/useApprovedDestinations";
import { useNotApprovedDestinations } from "../../../hooks/useNotApprovedDestinations";

const DestinationDetails = () => {
  const {
    singleDestination,
    getSingleDestination,
    error,
    loading,
    setLoading,
    setError,
  } = useSingleDestination();
  const { approvedDestinations } = useApprovedDestinations();
  const { destinationId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const token = localStorage.getItem("Authorization");
  const session = useSession();
  const userRole = session ? session.role : null;
  const isAdmin = userRole ? userRole === "admin" : null;
  const isUser = userRole ? userRole === "user" : null;
  const navigate = useNavigate();

  const deleteDestination = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/destinations/delete/${destinationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete destination");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateDestinationApproval = async (isApproved) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/destinations/approve/${destinationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ approved: isApproved }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Errore durante ${
            isApproved ? "l'approvazione" : "il rifiuto"
          } della destinazione`
        );
      }

      const data = await response.json();

      if (isApproved) {
        Swal.fire(
          "Successo!",
          "Destinazione approvata con successo.",
          "success"
        );
      } else {
        Swal.fire(
          "Successo!",
          "Destinazione scartata con successo.",
          "success"
        );
        deleteDestination();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const showEditingModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowReviewModal = () => setShowReviewModal(true);
  const handleCloseReviewModal = () => setShowReviewModal(false);

  useEffect(() => {
    getSingleDestination(destinationId);
  }, [destinationId]);

  if (loading) {
    return <RotateLoaderComponent />;
  }

  if (!singleDestination) {
    return <p>Destinazione non trovata.</p>;
  }

  // Destinazioni correlate filtrate in base alla categoria
  const correlatedDestinations = approvedDestinations.filter(
    (dest) =>
      dest.category === singleDestination.category &&
      dest._id !== singleDestination._id
  );

  return (
    <>
      <NavBar />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm mb-4">
              <Card.Img
                variant="top"
                src={singleDestination && singleDestination.img}
                className="destination-img"
              />
              <Card.Body>
                <Card.Title className="fw-bold">
                  {singleDestination && singleDestination.name}
                </Card.Title>
                <Card.Text className="text-muted">
                  {singleDestination && singleDestination.location}
                </Card.Text>
                <Card.Text className="text-info">
                  {singleDestination && singleDestination.category}
                </Card.Text>
                <Card.Text>
                  {singleDestination && singleDestination.description}
                </Card.Text>
                {isAdmin && singleDestination.approved && (
                  <div className="d-flex flex-column align-items-center justify-content-center gap-2 mt-3">
                    <Button
                      variant="primary"
                      className="mt-3"
                      onClick={showEditingModal}
                    >
                      Edit Destination
                    </Button>
                    <Button
                      variant="danger"
                      className="mt-3"
                      onClick={deleteDestination}
                    >
                      Delete Destination
                    </Button>
                  </div>
                )}

                {isAdmin && !singleDestination.approved && (
                  <div className=" d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
                      <Button
                        onClick={() => updateDestinationApproval(true)}
                        variant="success"
                      >
                        Approve Destination
                      </Button>
                      <Button
                        onClick={() => updateDestinationApproval(false)}
                        variant="danger"
                      >
                        Discard Destination
                      </Button>
                    </div>
                    <Button
                      variant="primary"
                      className="mt-3"
                      onClick={showEditingModal}
                    >
                      Edit Destination
                    </Button>
                  </div>
                )}

                {isUser && (
                  <>
                    <Button
                      variant="primary"
                      className="mt-3"
                      onClick={handleShowReviewModal}
                    >
                      Leave a Review
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>

          {session && (
            <Col md={8} lg={6}>
              <h3>Reviews</h3>
              {singleDestination.reviews && singleDestination.reviews.length > 0 ? (
                singleDestination.reviews.map((review, index) => (
                  <Card key={index} className="mb-4 shadow-sm p-3 rounded">
                    <Card.Body>
                      <Card.Title className="fw-bold mb-2">
                        {review.user && review.user.name} {review.user && review.user.surname}
                      </Card.Title>
                      <Card.Subtitle className="mb-3 text-muted">
                        Rating: {review && review.rating} / 5
                      </Card.Subtitle>
                      <Card.Text style={{ whiteSpace: "pre-wrap" }}>
                        {review && review.comment}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </Col>
          )}
        </Row>

        {/* RIGA DESTINAZIONI CORRELATE */}
        {correlatedDestinations.length > 0 && (
  <>
    <Row className="mt-5">
      <Col>
        <h4>Potrebbe Interessarti Anche:</h4>
      </Col>
    </Row>
    <Row className="justify-content-center">
      {correlatedDestinations.slice(0, 4).map((destination) => (
        <Col key={destination._id} md={6} lg={3} className="mb-4 d-flex align-items-stretch">
          <Card className="shadow-sm w-100 h-100 correlated-card">
            <Card.Img
              variant="top"
              src={destination.img}
              className="destination-img"
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{destination.name}</Card.Title>
              <Button
                variant="primary"
                onClick={() => navigate(`/destinations/${destination._id}`)}
                className="mt-auto"
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </>
)}


        

        <CreateReviewModal
          showReviewModal={showReviewModal}
          handleCloseReviewModal={handleCloseReviewModal}
          destinationId={destinationId}
        />

        <DestinationsEditingModal
          show={showModal}
          handleClose={handleCloseModal}
          destination={singleDestination}
        />
      </Container>
      <Footer />
    </>
  );
};

export default DestinationDetails;

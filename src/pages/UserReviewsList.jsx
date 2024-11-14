import React, { useState, useEffect } from "react";
import ReviewCard from "../components/Reviews/ReviewCard";
import EditReviewModal from "../components/Reviews/EditReviewModal";
import useSession from "../../hooks/useSession";
import Swal from "sweetalert2";
import { Container, Row, Alert } from "react-bootstrap";
import RotateLoaderComponent from "../components/Loaders/RotateLoaderComponent";

const UserReviewsList = () => {
  const [myReviews, setMyReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const session = useSession();
  const token = localStorage.getItem("Authorization");
  const userId = session ? session.userId : null;

  const getMyReviews = async () => {
    try {
      setIsLoading(true); 
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        Swal.fire("Errore", "Oops, qualcosa è andato storto", "error");
        return;
      }

      const data = await response.json();
      const myOwnReviews = data.data.filter(
        (review) => review.user && review.user._id === userId
      );
      setMyReviews(myOwnReviews);

      if (myOwnReviews.length === 0) {
        console.log("Non hai lasciato nessuna recensione");
      }
    } catch (error) {
      console.error("Errore nel recupero delle recensioni:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    if (userId && token && !isLoading) { 
      getMyReviews();
    }
  }, [userId, token]);

  const onDelete = async (reviewId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/reviews/delete/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        Swal.fire("Errore", "Impossibile eliminare la recensione", "error");
        return;
      }

      setMyReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
      Swal.fire("Successo", "Recensione eliminata con successo", "success");
    } catch (error) {
      Swal.fire("Errore", "Errore durante l'eliminazione della recensione", "error");
    }
  };

  const onUpdate = async (reviewId, updatedData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/reviews/update/${reviewId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        Swal.fire("Errore", "Impossibile aggiornare la recensione", "error");
        return;
      }

      const updatedReview = await response.json();
      setMyReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId ? { ...review, ...updatedReview } : review
        )
      );
      Swal.fire("Successo", "Recensione aggiornata con successo", "success");
    } catch (error) {
      Swal.fire("Errore", "Errore durante l'aggiornamento della recensione", "error");
    }
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReview(null);
  };

  return (
    <>
      {isLoading ? (
        <RotateLoaderComponent />
      ) : (
        <Container>
          <h2 className="my-4">Le tue recensioni</h2>
          {myReviews.length > 0 ? (
            <Row>
              {myReviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onEditReview={handleEditReview}
                  onDeleteReview={onDelete}
                />
              ))}
            </Row>
          ) : (
            <Alert variant="info">Non hai ancora recensioni.</Alert>
          )}
          <EditReviewModal
            show={showModal}
            onHide={handleCloseModal}
            review={selectedReview}
            onUpdate={onUpdate}
          />
        </Container>
      )}
    </>
  );
  
}

export default UserReviewsList;

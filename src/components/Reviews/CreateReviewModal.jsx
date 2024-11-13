import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import useSession from "../../../hooks/useSession"

const CreateReviewModal = ({ showReviewModal, handleCloseReviewModal, destinationId }) => {
  const [review, setReview] = useState({
    name: '',
    surname: '',
    rating: 1,
    comment: '',
  });
  

  const session = useSession();
  const userId = session ? session.userId : null;
  console.log(userId)
  
  

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      Swal.fire("Errore", "Devi essere loggato per lasciare una recensione", "error");
      return;
    }

    const reviewData = {
      user: userId,      
      destination: destinationId, 
      rating: review.rating,
      comment: review.comment,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/reviews/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();

      if (result.statusCode === 201) {
        Swal.fire("Successo", "La recensione è stata inviata", "success");
        handleCloseReviewModal(); // Chiude il modal
      } else {
        Swal.fire("Errore", result.message || "Errore durante l'invio della recensione", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Errore", "Errore nel server", "error");
    }
  };

  return (
    <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="reviewRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={review.rating}
              onChange={handleReviewChange}
              min="1"
              max="5"
            />
          </Form.Group>
          <Form.Group controlId="reviewComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              name="comment"
              value={review.comment}
              onChange={handleReviewChange}
              placeholder="Enter your review"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Review
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseReviewModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateReviewModal;

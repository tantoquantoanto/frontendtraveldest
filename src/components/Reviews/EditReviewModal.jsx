import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditReviewModal = ({ show, onHide, review, onUpdate }) => {
  const [updatedReview, setUpdatedReview] = useState({
    rating: review?.rating || '',
    comment: review?.comment || '',
  });

  useEffect(() => {
    if (review) {
      setUpdatedReview({ rating: review.rating, comment: review.comment });
    }
  }, [review]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (review && review._id) {
      onUpdate(review._id, updatedReview);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Recensione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              min="1"
              max="5"
              value={updatedReview.rating}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Commento</Form.Label>
            <Form.Control
              as="textarea"
              name="comment"
              rows={3}
              value={updatedReview.comment}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annulla
        </Button>
        <Button variant="primary" onClick={() => {handleSubmit();
          onHide()
        }}>
          Salva modifiche
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditReviewModal;

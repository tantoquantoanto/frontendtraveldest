import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { Edit, Trash } from 'lucide-react';

const ReviewCard = ({ review, onDeleteReview, onEditReview }) => {
  return (
    <Col sm={12} md={6} lg={4} className="mb-4">
      <Card className="shadow-sm h-100 d-flex flex-column">
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-primary">
            {review.destination.name}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Valutazione: {review.rating} / 5
          </Card.Subtitle>
          <Card.Text className="flex-grow-1" title={review.comment}>
            {review.comment}
          </Card.Text>
          
          <div className="d-flex justify-content-between mt-auto">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEditReview(review)}
            >
              <Edit size={16} /> Modifica
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDeleteReview(review._id)}
            >
              <Trash size={16} /> Elimina
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ReviewCard;

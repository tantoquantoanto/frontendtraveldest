import { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 

const UserCard = ({ img, name, surname, email, gender, id }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate()

  const goToDetailsPage = () => {
    navigate(`/users/${id}`)
  };

  return (
    <>
      <Col sm={12} md={6} lg={4} className="mb-4 d-flex">
        <Card className="shadow-sm w-100">
          <Card.Img
            variant="top"
            src={img}
            style={{ objectFit: "cover", height: "200px" }}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title className="mb-2">
              {name} {surname}
            </Card.Title>
            <Card.Text className="text-muted mb-2">{email}</Card.Text>
            <Card.Text className="text-muted">{gender}</Card.Text>
            <Button
              onClick={goToDetailsPage}
              variant="primary"
              className="mt-auto align-self-end"
            >
              Details
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default UserCard;

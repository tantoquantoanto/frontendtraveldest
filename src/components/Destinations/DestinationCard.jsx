import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react"; 
import "../componentscss/DestinationCard.css"
import useSession from "../../../hooks/useSession";

const DestinationCard = ({ img, name, location, category, id,isLiked, onLikeToggle }) => {
  const navigate = useNavigate();
  const [destinationId, setDestinationId] = useState(null);
  const session = useSession();
  const isAdmin = session ?  session.role === "admin" : null;
  


  const onClick = () => {
    setDestinationId(id);
    navigate(`/destinations/${id}`);
  };

  


  return (
    <Card className="destination-card shadow-sm w-100" style={{ height: "450px" }}>
      <Card.Img
        variant="top"
        src={img}
        className="destination-card-img"
        style={{ objectFit: "cover", height: "250px" }}
      />
      <Card.Body className="d-flex flex-column destination-card-body" style={{ height: "150px" }}>
        <Card.Title className="mb-2 text-truncate">{name}</Card.Title>
        <Card.Text className="text-muted mb-2 text-truncate">{location}</Card.Text>
        <Card.Text className="text-muted mb-2 text-truncate">{category}</Card.Text>
        <Button onClick={onClick} variant="primary" className="mt-auto destination-card-button">
          Details
        </Button>
        
        {!isAdmin && ( <Heart 
  onClick={() => onLikeToggle(id)} 
  size={24} 
  color={isLiked ? "red" : "gray"} 
  style={{ cursor: "pointer", marginTop: "10px" }} 
/>)}
      </Card.Body>
    </Card>
  );
};

export default DestinationCard;

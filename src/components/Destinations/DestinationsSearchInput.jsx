import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const DestinationsSearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (typeof onSearch === "function") { 
      onSearch(searchTerm);
    } else {
      console.error("onSearch non è una funzione");
    }
  };

  return (
    <div className="p-2">
      <Form className="d-flex" onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Cerca destinazioni"
          className="me-2"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="primary">Cerca</Button>
      </Form>
    </div>
  );
};

export default DestinationsSearchInput;

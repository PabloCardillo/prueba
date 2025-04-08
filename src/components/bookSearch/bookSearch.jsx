import { Form } from "react-bootstrap";

const BookSearch = ({ onSearchChange }) => {
  const handleChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <Form.Group className="mb-3 w-50 mx-auto" controlId="searchBook">
      <Form.Control
        type="text"
        placeholder="Buscar libro..."
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default BookSearch;

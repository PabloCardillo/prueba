import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const NewBook = ({ onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [available, setAvailable] = useState(false);

  const handleAddBook = (event) => {
    event.preventDefault();

    const bookData = {
      title,
      author,
      rating: parseInt(rating, 10),
      pageCount: parseInt(pageCount, 10),
      imageUrl,
      available,
    };

    onBookAdded(bookData);

    // Resetear campos
    setTitle("");
    setAuthor("");
    setRating("");
    setPageCount("");
    setImageUrl("");
    setAvailable(false);
  };

  return (
    <Card className="m-4 w-50" bg="success">
      <Card.Body>
        <Form className="text-white" onSubmit={handleAddBook}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar autor"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Puntuación</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresar cantidad de estrellas"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  max={5}
                  min={0}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="pageCount">
                <Form.Label>Cantidad de páginas</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresar cantidad de páginas"
                  value={pageCount}
                  onChange={(e) => setPageCount(e.target.value)}
                  min={1}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Form.Group className="mb-3" controlId="imageUrl">
              <Form.Label>URL de imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar URL de imagen"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="justify-content-end">
            <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
              <Form.Check
                type="switch"
                id="available"
                className="mb-3"
                label="¿Disponible?"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
              />
              <Button variant="primary" type="submit">
                Agregar lectura
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NewBook;

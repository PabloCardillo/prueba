import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function BookDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const book = state?.book;

  if (!book) {
    return (
      <div className="text-center mt-5">
        <h2>Libro no encontrado</h2>
        <Button onClick={() => navigate("/library")}> Volver </Button>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: "24rem" }}>
        <Card.Img
          variant="top"
          src={book.imageUrl}
          alt={book.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/250x350?text=Sin+imagen";
          }}
        />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>
            <strong>Autor:</strong> {book.author}
            <br />
            <strong>Rating:</strong> {book.rating} / 5
            <br />
            <strong>Páginas:</strong> {book.pageCount}
            <br />
            <strong>Disponible:</strong> {book.available ? "Sí" : "No"}
            <br />
            <strong>Resumen:</strong> <span className="d-block mt-2"><p>{book.summary}</p></span>
          </Card.Text>

          <Button variant="secondary" onClick={() => navigate("/library")}>
            Volver a la lista
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookDetails;
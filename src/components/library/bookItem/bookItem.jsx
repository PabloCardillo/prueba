import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function BookItem({
  id,
  title,
  author,
  rating,
  pageCount,
  imageUrl,
  available,
  onBookSelected,
  selectedTitle,
  onDelete,
}) {
  const isSelected = selectedTitle === title;

  return (
    <Link to={`/library/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <Card
        style={{
          width: "18rem",
          border: isSelected ? "2px solid green" : "1px solid #ccc",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        className="mx-3 mb-4"
        onClick={() => onBookSelected(title)}
      >
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={title}
          style={{ height: "250px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/250x350?text=Imagen+no+disponible";
          }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <strong>Autor:</strong> {author}<br />
            <strong>Rating:</strong> {rating} / 5<br />
            <strong>Páginas:</strong> {pageCount}<br />
            <strong>Disponible:</strong> {available ? "Sí" : "No"}
          </Card.Text>
          <Button
            variant="danger"
            size="sm"
            className="w-100"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Eliminar libro
          </Button>

          <Button
            variant="primary"
            className="w-100 mt-2"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/library/${id}`, {
                state: { book: { id, title, author, rating, pageCount, imageUrl, available } }
              });
            }}
          >
            Seleccionar libro
          </Button>

        </Card.Body>
      </Card>
    </Link>
  );
}

export default BookItem;

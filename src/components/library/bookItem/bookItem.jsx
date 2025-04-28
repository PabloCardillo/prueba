import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import { StarFill, Star } from "react-bootstrap-icons";

function BookItem({
  id,
  title,
  author,
  rating,
  pageCount,
  imageUrl,
  available,
  summary,
  onBookSelected,
  selectedTitle,
  onDelete,
}) {
  const isSelected = selectedTitle === title;
  const navigate = useNavigate(); 

  return (
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
          e.target.src =
            "https://via.placeholder.com/250x350?text=Imagen+no+disponible";
        }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>Autor:</strong> {author}
          <br />
          <strong>Rating:</strong> {rating} / 5 
          <div className="mt-2">
            {Array.from({ length: 5 }, (_, index) =>
              index < rating ? (
                <StarFill key={index} color="gold" />
              ) : (
                <Star key={index} color="gold" />
              )
            )}
          </div>
          
          <strong>Páginas:</strong> {pageCount}
          <br />
          <strong>Disponible:</strong> {available ? "Sí" : "No"}
        </Card.Text>

        

        <Button
          variant="danger"
          size="sm"
          className="w-100"
          onClick={(e) => {
            e.stopPropagation();
            const confirmDelete = window.confirm(
              `¿Estás seguro de eliminar "${title}"?`
            );
            if (confirmDelete) onDelete();
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
              state: {
                book: { 
                  id,
                  title,
                  author,
                  rating,
                  pageCount,
                  imageUrl,
                  available,
                  summary
                },
              },
            });
          }}
        >
          Seleccionar libro
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookItem;
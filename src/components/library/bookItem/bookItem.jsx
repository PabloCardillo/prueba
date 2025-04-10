import { Badge, Button, Card } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";

const BookItem = ({ title, author, rating, pageCount, imageUrl, available, onBookSelected, selectedTitle }) => {
  
  const handleClick = () => {
    onBookSelected(title);
  }
  
  return (
    <Card className="mx-3" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageUrl} alt={title} />
      <Card.Body>
        <div className="mb-2">
          {available ?
            <Badge bg="success">Disponible</Badge>
            :
            <Badge bg="danger">Reservado</Badge>
          }
        </div>
        <Card.Title style={{fontWeight: title === selectedTitle ? 'bold' : 'normal'}}>
          {title}
        </Card.Title>
        <div className="mt-2">
            {Array.from({ length: rating }).map((_, i) => (
              <StarFill key={`filled-${i}`} color="gold" />
            ))}
            {Array.from({ length: 5 - rating}).map((_, i) =>(
              <Star key={`empty-${i}`} color="gold"/>
            ))}
          </div>
        <Card.Text>Autor: {author}</Card.Text>
        <Card.Text>Calificación: {rating}</Card.Text>
        <Card.Text>Páginas: {pageCount}</Card.Text>
        <Button onClick={handleClick}>
          Seleccionar libro
        </Button>
        <Card.Text>{available ? "Disponible" : "No disponible"}</Card.Text>
      </Card.Body>
    </Card>
  )
  
}

export default BookItem;
import { Badge, Button, Card } from "react-bootstrap";

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
import { Form } from "react-bootstrap";

const BookSearch = () => {
    return (
        <Form.Group className="mb-3" controlId="searchBook">
            <Form.Control
                type="text"
                placeholder="Buscar Libro..."            
            />       
        </Form.Group>
    )
}

export default BookSearch
import { Modal, Button } from "react-bootstrap";

function ModalConfirm ({ show, onHide, onConfirm, bookTitle }) {
    return(
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro que deseas eliminar el libro <strong>{bookTitle}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Si, Deseo eliminarlo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirm;
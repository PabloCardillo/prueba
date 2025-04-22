import { Routes, Route, useNavigate, Outlet } from "react-router";
import Books from "../library/book";
import NewBook from "../library/newBook/newBook";
import ModalConfirm from "../UI/modalConfirm";
import BookDetails from "../library/bookDetails";
import { Button } from "react-bootstrap";
import { useState } from "react";

function Dashboard({
  setLoggedIn,
  bookList,
  onDeleteBook,
  onBookAdded,
  selectedBook,
  modalVisible,
  onConfirmDelete,
  onCloseModal,
  
}) {
  console.log("Libros que llegan al Dashboard:", bookList);

  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/login");
  };
  
  console.log("Se está renderizando el Dashboard");


  return (
    <div className="container py-4 text-center">
      { /* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Books Champion</h2>
        <div>
          <Button
            variant="success"
            className="me-2"
            onClick={() => navigate("add-book")}
          >
            Agregar Libro
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      </div>
  
      {/* Solo este bloque debe renderizar rutas */}
      <Routes>
        <Route path="/" element={
            <>
              <h1 className="mb-4">Book Champions App</h1>
              <p>Quiero leer libros</p>
  
              <Books books={bookList} onDeleteBook={onDeleteBook} />
  
              <ModalConfirm
                show={modalVisible}
                onHide={onCloseModal}
                onConfirm={onConfirmDelete}
                bookTitle={selectedBook?.title}
              />
            </>
          }
        />
        <Route
          path="add-book"
          element={
            <>
              <h3>Agregar un nuevo libro</h3>
              <NewBook onBookAdded={onBookAdded} />
            </>
          }
        />
        <Route
          path=":id"
          element={<BookDetails />}
        />
      </Routes>
    </div>
  );
}  

export default Dashboard;
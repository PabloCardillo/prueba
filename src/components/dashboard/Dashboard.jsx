import { Routes, Route, useNavigate, Outlet, data } from "react-router";
import Books from "../library/book";
import BookForm from "../library/newBook/newBook";
import ModalConfirm from "../UI/modalConfirm";
import BookDetails from "../library/bookDetails";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { successToast } from "../UI/notifications/notifications";
import { Book } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";

function Dashboard({
  setLoggedIn,
  bookList,
  setBookList,
  onDeleteBook,
  onBookAdded,
  selectedBook,
  modalVisible,
  onConfirmDelete,
  onCloseModal,
  
}) {

  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("book-champions-token")
  };

  const handleBookUpdate = (book) => {
    setBook(book);
  }

  const handleBookAdded = (enteredBook) => {
    if (!enteredBook.title || !enteredBook.author) {
      toast.error("El autor y/o titulo son requeridos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const token = localStorage.getItem("book-champions-token");

    fetch("http://localhost:3000/books", {
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      method: "POST",
      body: JSON.stringify(enteredBook)
    })
      .then(res => res.json())
      .then(data => {
        setBookList(prevBookList => [data, ...prevBookList]);
        successToast(`¡Libro ${data.title} agregado correctamente!`)
      })
      .catch(err => console.log(err));
  }

  const handleDeleteBook = async (id) => {
    try {
      const token = localStorage.getItem("book-champions-token");

      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Error al eliminar el libro");
      }
  
      const result = await response.text(); // La API responde con texto
      console.log(result);
  
      // Eliminar del estado
      setBookList(prevBookList => prevBookList.filter(book => book.id !== id));
  
      successToast("¡Libro eliminado correctamente!");
    } catch (error) {
      console.error("Error eliminando libro:", error);
    }
  };  

  const handleSaveBook = (event) => {
    event.preventDefault();

    const bookData = {
      title,
      author,
      rating: parseInt(rating, 10),
      pageCount: parseInt(pageCount, 10),
      imageUrl,
      available
    };

    fetch(`http://localhost:3000/books/${Book.id}`, {
      headers: {
        "Content-type" : "application/json",
        "Authorization": `Bearer ${token}`
      },
      method: "PUT",
      body: JSON.stringify(bookData)
    })
      .then(res => res.json())
      .then(() => {
        onBookSaved(bookData);
      })
      .catch(err => console.log(err))
  }

  const handleNavigateAddBook = () => {
    navigate("add-book");
  }

  useEffect(() => {
    const token = localStorage.getItem("book-champions-token");

    if (location.pathname === "/library" && token) {
      fetch("http://localhost:3000/books", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("No autorizado");
          }
          return res.json();
        })
        .then(data => {
          if (!Array.isArray(data)) {
            throw new Error("Respuesta inválida del servidor");
          }
          setBookList([...data]);
        })
        .catch(err => {
          console.error("Error al obtener libros:", err.message);
        });
    }
  }, [location]);


  return (
    <div className="container py-4 text-center">
      
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
              <BookForm onBookAdded={onBookAdded} />
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
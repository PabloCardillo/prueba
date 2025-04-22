import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./components/auth/login/login";
import Dashboard from "./components/dashboard/dashboard";
import NotFound from "./components/notFound";
import Protected from "./components/protected";
import ModalConfirm from "./components/UI/modalConfirm";

function App() {
  const [bookList, setBookList] = useState([
    {
      id: 1,
      title: "100 años de soledad",
      author: "Gabriel García Márquez",
      rating: 5,
      pageCount: 410,
      imageUrl:
        "https://images.cdn3.buscalibre.com/fit-in/360x360/61/8d/618d227e8967274cd9589a549adff52d.jpg",
      available: true,
    },
    {
      id: 2,
      title: "Asesinato en el Orient Express",
      author: "Agatha Christie",
      rating: 4,
      pageCount: 256,
      imageUrl:
        "https://m.media-amazon.com/images/I/71RFyM95qwL._AC_UF1000,1000_QL80_.jpg",
      available: true,
    },
    {
      id: 3,
      title: "Las dos torres",
      author: "J.R.R. Tolkien",
      rating: 5,
      pageCount: 352,
      imageUrl:
        "https://m.media-amazon.com/images/I/A1y0jd28riL._AC_UF1000,1000_QL80_.jpg",
      available: true,
    },
    {
      id: 4,
      title: "50 sombras de Grey",
      author: "E.L. James",
      rating: 1,
      pageCount: 514,
      imageUrl:
        "https://prodimage.images-bn.com/pimages/9781728260839_p0_v2_s1200x630.jpg",
      available: true,
    },
  ]);

  console.log(bookList)

  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  const handleDeleteRequest = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setBookList((prev) => prev.filter((b) => b.id !== selectedBook.id));
    setModalVisible(false);
    setSelectedBook(null);
  };

  const handleBookAdded = (newBook) => {
    const bookData = {
      ...newBook,
      id: Math.random(),
    };
    setBookList((prev) => [bookData, ...prev]);
  };

  const handleLogIn = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", "true");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogIn} />} />
        <Route
          path="/library/*"
          element={
            <Protected isSignedIn={loggedIn}>
              <Dashboard
                setLoggedIn={setLoggedIn}
                bookList={bookList}
                onDeleteBook={handleDeleteRequest}
                onBookAdded={handleBookAdded}
                selectedBook={selectedBook}
                modalVisible={modalVisible}
                onConfirmDelete={handleConfirmDelete}
                onCloseModal={() => setModalVisible(false)}
              />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

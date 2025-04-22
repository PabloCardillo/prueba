import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./components/auth/login/login";
import Dashboard from "./components/dashboard/dashboard";
import NotFound from "./components/notFound";
import Protected from "./components/protected";
import ModalConfirm from "./components/UI/modalConfirm";
import BookItem from "./components/library/bookItem/bookItem";

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
      summary: "100 años de soledad: “Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo.” Con estas palabras empieza una novela ya legendaria en los anales de la literatura universal, una de las aventuras literarias más fascinantes del siglo xx. Millones de ejemplares de Cien años de soledad leídos en todas las lenguas y el Premio Nobel de Literatura coronando una obra que se había abierto paso a “boca a boca” —como gusta decir el escritor— son la más palpable demostración de que la aventura fabulosa de la familia Buendía-Iguarán, con sus milagros, fantasías, obsesiones, tragedias, incestos, adulterios, rebeldías, descubrimientos y condenas, representaba al mismo tiempo el mito y la historia, la tragedia y el amor del mundo entero.",
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
      summary:"Asesinato en el Orient Express: Un grupo de viajeros se ven atrapados en el Orient Express en plena tormenta de nieve. Entre ellos pronto se descubre un cadáver. El asesino tiene que ser uno de los presentes. Al detective más famoso de la historia le corresponde averiguar quién ha cometido el crimen. Un referente universal. Uno de los casos más famosos de Hércules Poirot.",
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
      summary:"Las dos torres: La Compañía se ha disuelto y sus integrantes emprenden caminos separados. Frodo y Sam avanzan solos en su viaje a lo largo del río Anduin, perseguidos por la sombra misteriosa de un ser extraño que también ambiciona la posesión del Anillo. Mientras, hombres, elfos y enanos se preparan para la batalla final contra las fuerzas del Señor del Mal.",
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
      summary:"50 Sombras de Grey:Cuando la joven Anastasia conoce al poderoso y enigmático Christian Grey, comienzan un excitante, sensual y atormentado romance. Erótica, entretenida y profundamente conmovedora, la serie Cincuenta sombras es una historia que te cautivará, te poseerá y se quedará contigo por siempre.",
    },
  ]);

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
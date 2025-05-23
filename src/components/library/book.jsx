import { useState } from "react";
import BookItem from "./bookItem/bookItem";
import BookSearch from "./bookSearch/bookSearch";

function Books({ books, onDeleteBook }) {
  const [selectedBookTitle, setSelectedBookTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleBookSelected = (title) => {
    setSelectedBookTitle(title);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <BookSearch onSearchChange={handleSearchChange} />

      {selectedBookTitle && (
        <p style={{
          fontWeight: 'bold',
          textAlign: 'center',
          width: '100%'
        }}>
          Libro seleccionado: {selectedBookTitle}
        </p>
      )}

      <div className="d-flex justify-content-center flex-wrap my-5">
        {filteredBooks.map((book) => (
          <BookItem
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            rating={book.rating}
            pageCount={book.pageCount}
            imageUrl={book.imageUrl}
            available={book.available}
            summary={book.summary}
            onBookSelected={handleBookSelected}
            selectedTitle={selectedBookTitle}
            onDelete={() => onDeleteBook(book.id)} // función anónima
          />
        ))}
      </div>
    </>
  );
}

export default Books;
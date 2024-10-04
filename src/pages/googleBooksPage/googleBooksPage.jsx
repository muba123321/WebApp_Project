import React, { useState } from "react";
import axios from "axios";

export default function GoogleBooksPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const searchBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Google Books Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter book name"
      />
      <button onClick={searchBooks}>Search Books</button>
      <div>
        {books.map((book) => (
          <div key={book.id}>
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.authors?.join(", ")}</p>
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt="book cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

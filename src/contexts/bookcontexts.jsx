import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [allBooks, setAllBooks] = useState({ books: [], totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearching, setIsSearching] = useState(false);

  const getBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/books?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("Auth")),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore nel recupero dei libri");
      }
      const result = await response.json();
      setAllBooks({
        books: result.books || [],
        totalPages: result.totalPages || 0,
      });
    } catch (error) {
      console.error("Errore nel recupero dei libri:", error.message);
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Errore!",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const searchBooksByTitle = async () => {
    if (!inputValue.trim()) {
      setIsSearching(false);
      return getBooks();
    }

    setLoading(true);
    setError("");
    setIsSearching(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/books/search?title=${encodeURIComponent(inputValue)}&page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("Auth")),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore nella ricerca dei libri");
      }

      const result = await response.json();
      console.log("Risultati ricerca:", result);

      if (result.statusCode === 404) {
        Swal.fire({
          icon: "info",
          title: "Nessun risultato",
          text: "Nessun libro trovato con questo titolo.",
        });
        setAllBooks({ books: [], totalPages: 0 });
        return;
      }

      setAllBooks({
        books: result.books || [],
        totalPages: result.totalPages || 1,
      });
    } catch (e) {
      console.error("Errore nella ricerca dei libri:", e);
      Swal.fire({
        icon: "error",
        title: "Errore!",
        text: "Impossibile connettersi al server.",
      });
      setAllBooks({ books: [], totalPages: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue.trim() === "") {
      setIsSearching(false);
      getBooks();
    }
  };

  useEffect(() => {
    if (!isSearching) {
      getBooks();
    }
  }, [page, pageSize]);

  return (
    <BookContext.Provider
      value={{
        allBooks,
        inputValue,
        handleInputChange,
        searchBooks: searchBooksByTitle,
        loading,
        error,
        page,
        setPage,
        pageSize,
        setPageSize,
        getBooks,
        isSearching,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

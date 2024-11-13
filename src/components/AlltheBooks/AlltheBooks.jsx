import { useContext } from "react";
import { BookContext } from "../../contexts/bookcontexts.jsx";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import { Col, Row } from "react-bootstrap";
import BookCard from "../BooksCard/BooksCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const AlltheBooks = () => {
  const { allBooks, page, setPage, loading, error } = useContext(BookContext);

  const { isDark } = useContext(DarkModeContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Errore nel caricamento dei libri: {error}</div>;
  }

  if (!allBooks || !allBooks.books || allBooks.books.length === 0) {
    return <div>Nessun libro trovato.</div>;
  }
  console.log(allBooks);
  return (
    <div className={`container ${isDark ? "bg-dark text-light" : "bg-light"}`}>
      <Row className="mt-5 mb-5">
        {allBooks.books.map((book) => (
          <Col xs={6} md={4} lg={2} className="d-flex" key={book._id}>
            <BookCard
              _id={book._id}
              title={book.title}
              img={book.img}
              price={book.price}
              category={book.category}
              className="book-card"
            />
          </Col>
        ))}
      </Row>
      {allBooks.totalPages > 1 && (
        <Row className="justify-content-center mb-5">
          <Col xs={10} className="text-center">
            <ResponsivePagination
              current={page}
              total={allBooks.totalPages}
              onPageChange={setPage}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AlltheBooks;

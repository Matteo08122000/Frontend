import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavbarExample from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import Comments from "../Comments/Comments";
import RatingArea from "../RatingArea/RatingArea";
import { BookContext } from "../../contexts/bookcontexts";
import Footer from "../Footer/Footer";
import { SelectedComment } from "../../contexts/SelectedComment";

const BookDetails = () => {
  const { Bookid } = useParams();
  const [bookdetail, setBookdetail] = useState(null);
  const { allBooks: books } = useContext(BookContext);
  const [comments, setComments] = useState([]);

  const getBookDetails = async () => {
    if (!Bookid) return console.error("Bookid non definito");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/books/${Bookid}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("Auth")),
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Errore nella risposta del server");
      const book = await response.json();
      setBookdetail(book.book);
    } catch (error) {
      console.error("Errore nel recupero dei dettagli del libro:", error);
    }
  };

  useEffect(() => {
    getBookDetails();
  }, [Bookid]);

  return (
    <>
      <NavbarExample />
      <Container>
        <Row>
          {bookdetail ? (
            <>
              <Col className="d-flex justify-content-center" md={12}>
                <img
                  className="w-25 d-flex justify-content-center mt-5 rounded-5"
                  src={bookdetail.img}
                  alt={bookdetail.title}
                />
              </Col>
              <Col
                className="mt-5 d-flex flex-column justify-content-center align-items-center w-100"
                md={12}
              >
                <h2 className="fs-1 text-center">{bookdetail.title}</h2>
                <p className="fs-3">{bookdetail.category}</p>
                <p className="fs-4">{bookdetail.price.$numberDecimal}€</p>
              </Col>
              <Col className="mt-5 d-flex justify-content-center" md={12}>
                <Row className="w-100 justify-content-center">
                  <Col
                    md={12}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <RatingArea _id={Bookid} setComments={setComments} />
                  </Col>
                  <Col
                    md={12}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Comments _id={Bookid} setComments={setComments} />
                  </Col>
                </Row>
              </Col>
            </>
          ) : (
            <Col>
              <h2>Book not found</h2>
              <p>Sorry, the book you are looking for does not exist.</p>
            </Col>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};
export default BookDetails;

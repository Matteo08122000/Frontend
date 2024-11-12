import { useContext, useState } from "react";
import { BookContext } from "../../contexts/bookcontexts";
import { Form, Button, Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import AddBook from "../addBook";

const NavbarExample = () => {
  const { handleInputChange, searchBooks, inputValue } =
    useContext(BookContext);
  const { isDark, toggleDarkMode } = useContext(DarkModeContext);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await searchBooks();
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.FRONTEND_URL}/logout`, {
        method: "GET",
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Errore nel logout");
        alert("Errore nel logout. Riprova più tardi.");
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      alert("Errore di rete. Riprova più tardi.");
    }
  };

  return (
    <>
      <Navbar className="navs" expand="lg">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center ms-0 p-0"
        >
          <div className="d-flex align-items-center">
            <Navbar.Brand className="d-flex align-items-center" href="#">
              <Link to={"/home"}>
                <img
                  src="https://img.freepik.com/premium-vector/letter-e-book-logo-design-vector-silhouette-illustration_685330-3275.jpg"
                  alt="logo"
                  className="logo w-25 w-md-auto"
                  style={{ maxHeight: "100px", width: "auto" }}
                />
              </Link>
            </Navbar.Brand>
            <div className="ms-3 d-flex align-items-center">
              <Button variant="info" onClick={toggleDarkMode}>
                {isDark ? "Light Mode" : "Dark Mode"}
              </Button>
              <Nav className="d-none d-md-flex align-items-center ms-4">
                <ul className="d-flex align-items-center text-white list-unstyled gap-4 m-0">
                  <Link
                    className="text-decoration-none text-white"
                    to="/chi-siamo"
                  >
                    <li>Chi siamo</li>
                  </Link>
                  <Link
                    className="text-decoration-none text-white"
                    to="/contatti"
                  >
                    <li>Contatti</li>
                  </Link>
                  <Link
                    className="text-decoration-none text-white"
                    to="/privacy-policy"
                  >
                    <li>Privacy Policy</li>
                  </Link>
                </ul>
              </Nav>
            </div>
          </div>
          <Navbar.Toggle aria-controls="navbarResponsive" />
          <Navbar.Collapse
            id="navbarResponsive"
            className="justify-content-end"
          >
            <Form className="d-flex me-3" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search Book"
                className="me-2"
                value={inputValue}
                onChange={handleInputChange}
              />
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Form>
            <Button
              variant="primary"
              className="me-3"
              onClick={() => setShowAddBookModal(true)}
            >
              Add Book
            </Button>
            <Button className="me-4" variant="warning" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AddBook
        showModal={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
      />
    </>
  );
};

export default NavbarExample;

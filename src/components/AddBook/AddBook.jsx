import { useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { createBook } from "../../services/bookServices";

const AddBook = ({ showModal, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    asin: "",
    img: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setFile(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createdBook = await createBook(formData, file);
      if (createdBook) {
        console.log("Libro creato:", createdBook);
        onClose();
      }
    } catch (error) {
      console.error("Errore durante la creazione del libro:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi Libro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
          {["title", "category", "price", "asin"].map((field) => (
            <Form.Group
              controlId={`form${field.charAt(0).toUpperCase() + field.slice(1)}`}
              key={field}
            >
              <Form.Label>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Form.Label>
              <Form.Control
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </Form.Group>
          ))}
          <Form.Group controlId="formImg">
            <Form.Label>Immagine</Form.Label>
            <Form.Control
              type="file"
              name="img"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            disabled={loading}
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Aggiungi"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddBook;

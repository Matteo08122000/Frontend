import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import { postComment } from "../../Api/api";
import Swal from "sweetalert2";
import useSession from "../../hooks/useSession";
import { SelectedComment } from "../../contexts/SelectedComment";

const RatingArea = ({ _id, setComments }) => {
  const session = useSession();
  const { toggleCardAsin } = useContext(SelectedComment);
  const [formState, setFormState] = useState({
    rate: 0,
    comment: "",
    book: _id,
    user: session._id,
  });

  const handleStarClick = (ratingValue) => {
    setFormState({ ...formState, rate: ratingValue });
  };

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formState.rate === 0) {
      Swal.fire({
        icon: "error",
        title: "Errore",
        text: "Devi selezionare una valutazione prima di inviare il commento!",
      });
      return;
    }
    try {
      const newComment = await postComment(formState);
      setComments((prevComments) => [...prevComments, newComment]);
      setFormState({
        rate: 0,
        comment: "",
        book: _id,
        user: session.user._id,
      });
      toggleCardAsin(_id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className="rating d-flex justify-content-center">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rate"
                value={ratingValue}
                onClick={() => handleStarClick(ratingValue)}
                style={{ display: "none" }}
              />
              {ratingValue <= formState.rate ? (
                <FaStar
                  size={30}
                  color={"#ffc107"}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FaRegStar
                  size={30}
                  color={"#ffc107"}
                  style={{ cursor: "pointer" }}
                />
              )}
            </label>
          );
        })}
      </div>
      <Form.Control
        className="mt-5 mb-2 d-flex justify-content-center"
        type="text"
        required={true}
        name="comment"
        onChange={handleInputChange}
        placeholder="Commento"
      />
      <Button type="submit" variant="success" className="mt-2 mb-5">
        Invia Commento
      </Button>
    </Form>
  );
};

export default RatingArea;

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { SelectedComment } from "../../contexts/SelectedComment";
import { Link } from "react-router-dom";

const BookCard = ({ title, price, category, img, _id }) => {
  const { commentCardAsin, toggleCardAsin } = useContext(SelectedComment);
  const isSelected = commentCardAsin === _id;
  const selectedCardStyle = isSelected ? "border-5 border-danger" : "";
  const priceValue = price?.$numberDecimal || "N/A";

  return (
    <Card
      className={`w-100 Card-Box ${selectedCardStyle}`}
      onClick={() => toggleCardAsin(_id)}
    >
      <Card.Img variant="top" className="w-100" src={img} role="img" />
      <Card.Body>
        <Card.Title>{category}</Card.Title>
        <Card.Text className="text-truncate">{title}</Card.Text>
        <Card.Text>{`${priceValue} €`}</Card.Text>
      </Card.Body>
      <Link
        to={`/Book/${_id}`}
        className="w-100 d-flex justify-content-center text-decoration-none"
      >
        <Button variant="secondary" className="m-1 w-100">
          Dettagli
        </Button>
      </Link>
    </Card>
  );
};

export default BookCard;

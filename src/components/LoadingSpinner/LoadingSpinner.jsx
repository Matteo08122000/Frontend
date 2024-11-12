import { Row, Col } from "react-bootstrap";
import HashLoader from "react-spinners/HashLoader";

const LoadingSpinner = () => {
  return (
    <Row>
      <Col className="d-flex align-items-center justify-content-center w-100 h-100">
        <HashLoader color="green" />
      </Col>
    </Row>
  );
};

export default LoadingSpinner;

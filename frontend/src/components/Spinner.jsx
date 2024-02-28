import Spinner from "react-bootstrap/Spinner";

const LoadSpinner = () => {
  return (
    <Spinner animation="border" variant="warning" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default LoadSpinner;

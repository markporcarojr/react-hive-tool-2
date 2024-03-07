import Spinner from "react-bootstrap/Spinner";

const LoadSpinner = () => {
  return (
    <div className="d-flex justify-content-around mb-3">
      <Spinner
        animation="border"
        variant="warning"
        role="status"
        className="text-center"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadSpinner;

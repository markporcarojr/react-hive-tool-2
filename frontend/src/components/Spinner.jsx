import Spinner from "react-bootstrap/Spinner";

const LoadSpinner = () => {
    return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }s

export default LoadSpinner;

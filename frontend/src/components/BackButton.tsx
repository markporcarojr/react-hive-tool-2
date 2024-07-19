import { Button } from "react-bootstrap";

const BackButton = ({ text }) => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <Button variant="primary" onClick={goBack}>
      {text}
    </Button>
  );
};

export default BackButton;

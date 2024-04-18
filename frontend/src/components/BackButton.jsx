import React from "react";
import { Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ text }) => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <Button variant="primary" onClick={goBack}>
      {/* <BsArrowLeft /> */}
      {text}
    </Button>
  );
};

export default BackButton;

import React from "react";
import { Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <Button variant="primary" onClick={goBack}>
      {/* <BsArrowLeft /> */}NO
    </Button>
  );
};

export default BackButton;

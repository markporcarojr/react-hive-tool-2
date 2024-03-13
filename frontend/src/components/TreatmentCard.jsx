import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Card } from "react-bootstrap";

const TreatmentCard = ({ treatment }) => {
  const { hiveNumber, treatmentType, treatmentDate } = treatment;
  const formattedDate = new Date(treatmentDate).toLocaleDateString("en-US");

  return (
    <Col className="gy-4">
      <Container className="px-2 pop" style={{ maxWidth: "500px" }}>
        <Card
          className="text-michgold border-michgold rounded-5 border-3 bg-card"
          style={{ borderColor: "#ffcb05" }}
        >
          <Card.Header className="d-flex justify-content-between pt-0 ">
            <div className="m-2 mb-0 fs-3">Hive #{hiveNumber}</div>
            <div className="m-2 mb-0 fs-4">{formattedDate}</div>
          </Card.Header>
          <Card.Body className="mb-0 fs-4 p-2 text-center">
            <Card.Title className="mb-0 fs-4 p-2 text-decoration-underline">
              {treatmentType}
            </Card.Title>
          </Card.Body>
          <div className="d-flex justify-content-between mx-3 mb-2">
            <Link
              to={`/treatments/delete/${treatment._id}`}
              className="btn btn-outline-danger rounded-pill"
            >
              DELETE
            </Link>
            <Link
              to={`/treatments/edit/${treatment._id}`}
              className="btn btn-outline-warning rounded-pill"
            >
              EDIT
            </Link>
          </div>
        </Card>
      </Container>
    </Col>
  );
};

export default TreatmentCard;

import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Card } from "react-bootstrap";

const HarvestCard = ({ harvest }) => {
  const { harvestAmount, harvestType, harvestDate, userId } = harvest;
  const utcDate = new Date(harvestDate);
  const options = { timeZone: "UTC" };
  const formattedDate = utcDate.toLocaleDateString("en-US", options);

  return (
    <Col className="gy-4">
      <Container className="px-2 pop" style={{ maxWidth: "500px" }}>
        <Card
          className="text-michgold border-michgold rounded-5 border-3 bg-card"
          style={{ borderColor: "#ffcb05" }}
        >
          <Card.Header>
            <div className="text-center fs-4">{formattedDate}</div>
          </Card.Header>
          <Card.Body>
            <Card.Title className="mb-0 fs-4 p-2 fw-bold d-flex justify-content-between pt-0 ">
              <div className="fs-3">{harvestType}</div>
              <div className="fs-3">+ {harvestAmount} Lbs</div>
            </Card.Title>
          </Card.Body>
          <div className="d-flex justify-content-between mx-3 mb-2">
            <Link
              to={`/harvest/delete/${harvest._id}`}
              className="btn btn-outline-danger rounded-pill"
            >
              DELETE
            </Link>
            <Link
              to={`/harvest/edit/${harvest._id}`}
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

export default HarvestCard;

import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Card } from "react-bootstrap";

const SwarmCard = ({ swarm }) => {
  const { swarmNumber, location, swarmDate, userId } = swarm;
  const utcDate = new Date(swarmDate);
  const options = { timeZone: "UTC" };
  const formattedDate = utcDate.toLocaleDateString("en-US", options);

  return (
    <Col className="gy-4">
      <Container className="px-2">
        <Card className="text-michgold  bg-card">
          <Card.Header className="d-flex justify-content-between pt-0 ">
            <div className="m-2 mb-0 fs-3">Swarm #{swarmNumber}</div>
            <div className="m-2 mb-0 fs-4">{formattedDate}</div>
          </Card.Header>
          <Card.Body className="mb-0 fs-4 p-2 text-center">
            <Card.Title className="mb-0 fs-4 fw-bold p-2">
              Location: {location}
            </Card.Title>
          </Card.Body>
          <div className="d-flex justify-content-between mx-3 mb-2">
            <Link
              to={`/swarm/delete/${swarm._id}`}
              className="btn btn-outline-danger rounded-pill"
            >
              DELETE
            </Link>
            <Link
              to={`/swarm/edit/${swarm._id}`}
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

export default SwarmCard;

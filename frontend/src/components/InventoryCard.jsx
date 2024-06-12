import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Card } from "react-bootstrap";

const InventoryCard = ({ inventory }) => {
  const { inventoryAmount, inventoryType, inventoryLocation, userId } =
    inventory;
  return (
    <Col className="gy-4">
      <Container className="px-2" style={{ maxWidth: "500px" }}>
        <Card
          className="text-michgold  bg-card"
          // style={{ borderColor: "#ffcb05" }}
        >
          <Card.Header className="mt-2 mb-0 fs-4 p-2 text-center">
            {inventoryType}
          </Card.Header>
          <Card.Body className="text-center pt-0">
            <Card.Title className="mt-2 mb-0 fs-4 p-2 ">
              Amount:{" "}
              <span className="text-decoration-underline">
                {inventoryAmount}
              </span>
            </Card.Title>
            <div>
              <Card.Title className="mt-2 mb-0 fs-4 p-2 ">
                Location: {inventoryLocation}
              </Card.Title>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </Col>
  );
};

export default InventoryCard;

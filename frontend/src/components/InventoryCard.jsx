import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Card } from "react-bootstrap";

const InventoryItem = ({ inventory }) => {
  const { inventoryAmount, inventoryType } = inventory;
  return (
    <Col className="gy-4">
      <Container className="px-2 pop" style={{ maxWidth: "500px" }}>
        <Card
          className="text-michgold border-michgold rounded-5 border-3 bg-card"
          style={{ borderColor: "#ffcb05" }}
        >
          <Card.Header className="mt-2 mb-0 fs-4 p-2 text-center">
            {inventoryType}
          </Card.Header>
          <Card.Body className="d-flex justify-content-around pt-0">
            <Card.Title className="mt-2 mb-0 fs-4 p-2 text-decoration-underline">
              {inventoryAmount}
            </Card.Title>
          </Card.Body>
          <div className="d-flex justify-content-between mx-3 mb-2">
            <Link
              to={`/inventory/delete/${inventory._id}`}
              className="btn btn-outline-danger rounded-pill"
            >
              DELETE
            </Link>
            <Link
              to={`/inventory/edit/${inventory._id}`}
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

export default InventoryItem;

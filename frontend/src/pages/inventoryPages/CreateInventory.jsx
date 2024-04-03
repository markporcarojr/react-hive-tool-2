import React, { useState, useContext } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import UserContext from "../../components/UserContext.jsx";

const CreateInventory = () => {
  const { user } = useContext(UserContext);
  const [inventoryType, setInventoryType] = useState("");
  const [inventoryAmount, setInventoryAmount] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveInventory = (e) => {
    e.preventDefault();
    const data = {
      inventoryType,
      inventoryAmount,
      userId: user._id,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/inventory", data)
      .then(() => {
        setLoading(false);
        navigate("/inventory");
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <>
      <CustomNavbar />
      {loading && <LoadSpinner />}
      <Container style={{ maxWidth: "700px" }}>
        <Card className="text-michgold text-center mt-2 mb-5">
          {/* Include your partial title here */}
          {/* Assuming partials/title is another component */}
          {/* <%- include("partials/title")%> */}

          {/* Forms */}
          <Form id="inventory-form" onSubmit={handleSaveInventory}>
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="inventoryType">Equipment Name</Form.Label>
              <Form.Control
                type="text"
                id="inventoryType"
                name="inventoryType"
                onChange={(e) => setInventoryType(e.target.value)}
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
              />
            </div>
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="inventoryAmount">Quantity</Form.Label>
              <Form.Control
                type="number"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                id="inventoryAmount"
                name="inventoryAmount"
                value={inventoryAmount}
                onChange={(e) => setInventoryAmount(e.target.value)}
              />
            </div>
          </Form>
          {/* Form end */}

          <div className="d-flex justify-content-around mb-3">
            <Button
              type="submit"
              form="inventory-form"
              className="btn px-5 btn-michgold btn-gold fw-bold rounded-pill"
            >
              ADD
            </Button>
          </div>
          <p style={{ color: "#ab0a0a", textAlign: "center" }}>{message}</p>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default CreateInventory;

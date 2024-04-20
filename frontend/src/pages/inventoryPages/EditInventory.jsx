import React, { useState, useEffect } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";

const EditInventory = () => {
  const [inventoryType, setInventoryType] = useState("");
  const [inventoryAmount, setInventoryAmount] = useState("");
  const [inventoryLocation, setInventoryLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/inventory/${id}`)
      .then((res) => {
        setInventoryType(res.data.inventoryType);
        setInventoryAmount(res.data.inventoryAmount);
        setInventoryLocation(res.data.inventoryLocation);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.response.data.message);
        console.log("Error fetching data:", error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditInventory = (e) => {
    e.preventDefault();
    const data = {
      inventoryType,
      inventoryAmount,
      inventoryLocation,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/inventory/${id}`, data)
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
          <h1 className="fw-bold m-4">EDIT ITEM</h1>

          {/* Include your partial title here */}
          {/* Assuming partials/title is another component */}
          {/* <%- include("partials/title")%> */}

          {/* Forms */}
          <Form id="edit-inventory-form">
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="inventoryType">Equipment Name</Form.Label>
              <Form.Control
                type="text"
                id="inventoryType"
                name="inventoryType"
                value={inventoryType}
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
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="inventoryLocation">Location</Form.Label>
              <Form.Control
                type="text"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                id="inventoryLocation"
                name="inventoryLocation"
                value={inventoryLocation}
                onChange={(e) => setInventoryLocation(e.target.value)}
              />
            </div>
          </Form>
          {/* Form end */}

          <div className="d-flex justify-content-around mb-3">
            <Button
              type="submit"
              form="edit-inventory-form"
              className="btn px-5 btn-michgold fw-bold rounded-pill"
              onClick={handleEditInventory}
            >
              UPDATE
            </Button>
          </div>
          <p style={{ color: "#ab0a0a", textAlign: "center" }}>{message}</p>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default EditInventory;

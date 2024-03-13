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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/inventory/${id}`)
      .then((res) => {
        setInventoryType(res.data.inventoryType);
        setInventoryAmount(res.data.inventoryAmount);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error fetching data:", error);
        alert("An error has occurred. Please check Console");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditInventory = (e) => {
    e.preventDefault();
    const data = {
      inventoryType,
      inventoryAmount,
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
        alert("An error has occurred. Please Check Console");
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
          <Form id="edit-inventory-form">
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="inventoryType">Equipment Name</Form.Label>
              <Form.Control
                type="text"
                id="inventoryType"
                name="inventoryType"
                value={inventoryType}
                onChange={(e) => setInventoryType(e.target.value)}
                className="form-control bg-inputgrey border-3 border-michgold rounded-4 opacity-50 fw-bold text-center"
              />
            </div>
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="inventoryAmount">Quantity</Form.Label>
              <Form.Control
                type="number"
                className="form-control text-center bg-inputgrey border-3 border-michgold rounded-4 opacity-50 fw-bold"
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
              form="edit-inventory-form"
              className="btn px-5 btn-michgold btn-gold fw-bold rounded-pill"
              onClick={handleEditInventory}
            >
              UPDATE
            </Button>
          </div>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default EditInventory;

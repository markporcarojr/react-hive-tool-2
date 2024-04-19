import React, { useState, useEffect } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";

const EditSwarm = () => {
  const [swarmNumber, setSwarmNumber] = useState("");
  const [location, setLocation] = useState("");
  const [swarmDate, setSwarmDate] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/swarm/${id}`)
      .then((res) => {
        setSwarmNumber(res.data.swarmNumber);
        setLocation(res.data.location);
        setSwarmDate(res.data.swarmDate);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error fetching data:", error);
        setMessage(error.response.data.message);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditSwarm = (e) => {
    e.preventDefault();
    const data = {
      swarmNumber,
      location,
      swarmDate,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/swarm/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/swarm");
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
          <h1 className="fw-bold m-4">EDIT SWARM</h1>

          {/* Include partial title here */}

          {/* Forms */}
          <Form onSubmit={handleEditSwarm} id="swarm-form">
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="swarmNumber">Swarm Number</Form.Label>
              <Form.Control
                type="number"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                name="swarmNumber"
                id="swarmNumber"
                value={swarmNumber}
                onChange={(e) => setSwarmNumber(e.target.value)}
                aria-describedby="swarmNumber"
              />
            </div>
            <div className="m-3 mt-0 fs-3 fw-semibold">
              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  as="textarea"
                  className="bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  rows={3}
                />
              </Form.Group>
            </div>
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="swarmDate">Date</Form.Label>
              <Form.Control
                type="date"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                id="swarmDate"
                name="swarmDate"
                value={swarmDate}
                onChange={(e) => setSwarmDate(e.target.value)}
              />
            </div>
          </Form>
          {/* Form end */}

          <div className="d-flex justify-content-around mb-3">
            <Button
              type="submit"
              form="swarm-form"
              className="btn px-5 btn-michgold btn-gold fw-bold rounded-pill"
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

export default EditSwarm;

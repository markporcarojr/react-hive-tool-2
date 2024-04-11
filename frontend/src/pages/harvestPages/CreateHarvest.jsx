import { useState, useContext } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import UserContext from "../../context/UserContext";

const CreateHarvest = () => {
  const { user } = useContext(UserContext);
  const [harvestType, setHarvestType] = useState("");
  const [harvestAmount, setHarvestAmount] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveHarvest = (e) => {
    e.preventDefault();
    const data = {
      harvestAmount,
      harvestType,
      harvestDate,
      userId: user._id,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/harvest", data)
      .then(() => {
        setLoading(false);
        navigate("/harvest");
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

          {/* Forms */}
          <Form onSubmit={handleSaveHarvest} id="harvest-form">
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="harvestAmount">Harvest Amount</Form.Label>
              <Form.Control
                type="number"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                name="harvestAmount"
                id="harvestAmount"
                value={harvestAmount}
                onChange={(e) => setHarvestAmount(e.target.value)}
                aria-describedby="harvestAmount"
              />
            </div>
            <div className="m-3 mt-0 fs-3 fw-semibold">
              <Form.Label htmlFor="harvestType">Harvest Type</Form.Label>
              <Form.Select
                id="harvestType"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                aria-label="select example"
                name="harvestType"
                value={harvestType}
                onChange={(e) => setHarvestType(e.target.value)}
              >
                <option selected>---</option>
                <option value="Honey">Honey</option>
                <option value="Wax">Wax</option>
              </Form.Select>
            </div>
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="harvestDate">Date</Form.Label>
              <Form.Control
                type="date"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                id="harvestDate"
                name="harvestDate"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
              />
            </div>
          </Form>
          {/* Form end */}

          <div className="d-flex justify-content-around mb-3">
            <Button
              type="submit"
              form="harvest-form"
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

export default CreateHarvest;

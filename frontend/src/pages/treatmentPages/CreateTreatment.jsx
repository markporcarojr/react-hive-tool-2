import { useState, useContext } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import UserContext from "../../components/UserContext";

const CreateTreatment = () => {
  const { user } = useContext(UserContext);
  const [hiveNumber, setHiveNumber] = useState("");
  const [treatmentType, setTreatmentType] = useState("");
  const [treatmentDate, setTreatmentDate] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveTreatment = (e) => {
    e.preventDefault();
    const data = {
      hiveNumber,
      treatmentType,
      treatmentDate,
      userId: user._id,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/treatments", data)
      .then(() => {
        setLoading(false);
        navigate("/treatments");
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
          <Form onSubmit={handleSaveTreatment} id="treatment-form">
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="hiveNumber">Hive Number</Form.Label>
              <Form.Control
                type="number"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                name="hiveNumber"
                id="hiveNumber"
                value={hiveNumber}
                onChange={(e) => setHiveNumber(e.target.value)}
                aria-describedby="hiveNumber"
              />
            </div>
            <div className="m-3 mt-0 fs-3 fw-semibold">
              <Form.Label htmlFor="treatmentType">Treatment</Form.Label>
              <Form.Select
                id="treatmentType"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                aria-label="select example"
                name="treatmentType"
                value={treatmentType}
                onChange={(e) => setTreatmentType(e.target.value)}
              >
                <option selected>---</option>
                <option value="Oxalic Acid">Oxalic Acid</option>
                <option value="Formic Acid">Formic Acid</option>
                <option value="Apivar">Apivar</option>
                <option value="Super DFM">Super DFM</option>
              </Form.Select>
            </div>
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="treatmentDate">Date</Form.Label>
              <Form.Control
                type="date"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                id="treatmentDate"
                name="treatmentDate"
                value={treatmentDate}
                onChange={(e) => setTreatmentDate(e.target.value)}
              />
            </div>
          </Form>
          {/* Form end */}

          <div className="d-flex justify-content-around mb-3">
            <Button
              type="submit"
              form="treatment-form"
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

export default CreateTreatment;

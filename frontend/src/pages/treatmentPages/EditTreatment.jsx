import React, { useState, useEffect } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";

const EditTreatment = () => {
  const [hiveNumber, setHiveNumber] = useState("");
  const [treatmentType, setTreatmentType] = useState("");
  const [treatmentDate, setTreatmentDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/treatments/${id}`)
      .then((res) => {
        setHiveNumber(res.data.hiveNumber);
        setTreatmentType(res.data.treatmentType);
        setTreatmentDate(res.data.treatmentDate);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error fetching data:", error);
        alert("An error has occurred. Please check Console");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditTreatment = (e) => {
    e.preventDefault();
    const data = {
      hiveNumber,
      treatmentType,
      treatmentDate,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/treatments/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/treatments");
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

          {/* Forms */}
          <Form onSubmit={handleEditTreatment} id="treatment-form">
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
                <option selected disabled>
                  Select Treatment
                </option>
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
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default EditTreatment;

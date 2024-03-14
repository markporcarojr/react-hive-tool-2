import React, { useState, useEffect } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";

const EditInspection = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(50);
  const [formData, setFormData] = useState({
    hiveNumber: 0,
    temperament: "",
    hiveStrength: 50,
    queen: "",
    queenCell: "",
    eggs: "",
    brood: "",
    disease: "",
    pests: "",
    inspectionDate: "",
    inspectionNote: "",
  });
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/inspections/${id}`)
      .then((res) => {
        setFormData({
          hiveNumber: res.data.hiveNumber,
          temperament: res.data.temperament,
          hiveStrength: res.data.hiveStrength,
          queen: res.data.queen,
          queenCell: res.data.queenCell,
          eggs: res.data.eggs,
          brood: res.data.brood,
          disease: res.data.disease,
          pests: res.data.pests,
          inspectionDate: res.data.inspectionDate,
          inspectionNote: res.data.inspectionNote,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error has occurred. Please check console");
        console.error("Error fetching inspection data:", error);
      });
  }, []);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10); // Parse slider value to integer
    setSliderValue(value); // Update slider value state
    setFormData((prevState) => ({
      ...prevState,
      hiveStrength: value, // Update hiveStrength state as number
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let parsedValue = value; // Initialize parsedValue with the value directly

    // Check if the input type is checkbox and handle accordingly
    if (type === "checkbox") {
      parsedValue = checked
        ? "✓ " + name.charAt(0).toUpperCase() + name.slice(1)
        : ""; // Convert checkbox value to string
    } else if (name === "hiveNumber") {
      parsedValue = parseInt(value, 10); // Parse hiveNumber to integer
    }

    // Update formData state
    setFormData((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  const handleEditInspection = (e) => {
    e.preventDefault();
    const data = {
      hiveNumber: formData.hiveNumber,
      temperament: formData.temperament,
      hiveStrength: formData.hiveStrength,
      queen: formData.queen,
      queenCell: formData.queenCell,
      brood: formData.brood,
      disease: formData.disease,
      eggs: formData.eggs,
      pests: formData.pests,
      inspectionDate: formData.inspectionDate,
      inspectionNote: formData.inspectionNote,
    };
    axios
      .put(`http://localhost:5555/inspections/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/inspections");
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
      <Container className="mt-2 mb-5" style={{ maxWidth: "700px" }}>
        <Card className="text-michgold text-center">
          <Card.Body>
            {/* Form */}
            <Form onSubmit={handleEditInspection} id="inspection-form">
              {/* Hive Number */}
              <Form.Group className="m-3 fs-3 mt-0 fw-semibold">
                <Form.Label>Hive Number</Form.Label>
                <Form.Control
                  className="text-center text-white bg-inputgrey border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  type="number"
                  id="hiveNumber"
                  name="hiveNumber"
                  onChange={handleChange}
                  value={formData.hiveNumber}
                />
              </Form.Group>

              {/* Temperament */}
              <Form.Group className="m-3 fs-3 mt-0 fw-semibold mb-3">
                <Form.Label>Temperament</Form.Label>
                <div className="d-flex justify-content-evenly">
                  <Form.Check
                    type="radio"
                    label="Dead"
                    id="dead"
                    name="temperament"
                    value="⚠️ Dead"
                    checked={formData.temperament === "⚠️ Dead"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Calm"
                    id="calm"
                    name="temperament"
                    value="✓ Calm"
                    checked={formData.temperament === "✓ Calm"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Aggressive"
                    id="aggressive"
                    name="temperament"
                    value="⚠️ Aggressive"
                    checked={formData.temperament === "⚠️ Aggressive"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Active"
                    id="active"
                    name="temperament"
                    value="✓ Active"
                    checked={formData.temperament === "✓ Active"}
                    onChange={handleChange}
                  />
                </div>
                {/* Add the other radio buttons similarly */}
              </Form.Group>

              {/* Hive Strength */}

              <label
                htmlFor="hiveStrength"
                className="form-label my-1 fs-3 fw-semibold"
              >
                Hive Strength
              </label>
              <div className="d-flex justify-content-evenly mb-3">
                <p className="mt-3" style={{ flex: 1 }}>
                  0
                </p>

                <input
                  type="range"
                  className="m-3 custom-range"
                  min="0"
                  max="100"
                  id="hiveStrength"
                  name="hiveStrength"
                  style={{ minWidth: "60%", flex: 3 }}
                  value={formData.hiveStrength}
                  onChange={handleSliderChange}
                />

                <div style={{ flex: 1 }}>
                  <span id="sliderValue" className="mt-3">
                    {sliderValue}
                  </span>
                </div>
              </div>

              {/* Queen, Queen Cells, Eggs */}
              <Form.Group className="mb-3">
                <div className="ps-0 form-check d-flex justify-content-between">
                  <label className="fs-2 mb-0" htmlFor="queen">
                    Queen Spotted
                  </label>
                  <Form.Check
                    className="fs-2 mb-0"
                    type="checkbox"
                    id="queen"
                    name="queen"
                    checked={formData.queen}
                    onChange={handleChange}
                    value="Queen Present"
                  />
                </div>
                <div className="ps-0 form-check d-flex justify-content-between">
                  <label className="fs-2 mb-0" htmlFor="queenCell">
                    Queen Cells
                  </label>
                  <Form.Check
                    className="fs-2 mb-0"
                    type="checkbox"
                    id="queenCell"
                    name="queenCell"
                    checked={formData.queenCell}
                    onChange={handleChange}
                  />
                </div>
                <div className="ps-0 form-check d-flex justify-content-between">
                  <label className="fs-2 mb-0" htmlFor="eggs">
                    Eggs
                  </label>
                  <Form.Check
                    className="fs-2 mb-0"
                    type="checkbox"
                    id="eggs"
                    name="eggs"
                    checked={formData.eggs}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>

              {/* Brood */}
              <Form.Group className="mb-3">
                <Form.Select
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="brood"
                  name="brood"
                  onChange={handleChange}
                  value={formData.brood}
                >
                  <option>Brood</option>
                  <option value="✓ Normal Brood">Normal</option>
                  <option value="✓ Spotty Brood">Spotty</option>
                  <option value="✓ Compact Brood">Compact</option>
                </Form.Select>
              </Form.Group>

              {/* Disease */}
              <Form.Group className="mb-3">
                <Form.Select
                  className="text-center text-white bg-inputgrey border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="disease"
                  name="disease"
                  onChange={handleChange}
                  value={formData.disease}
                >
                  <option className="">Disease</option>
                  <option value="No Diseases">No Diseases</option>
                  <option value="⚠️ Varroa Mites">Varroa Mites</option>
                  <option value="⚠️ Chalkbrood">Chalkbrood</option>
                  <option value="⚠️ Stonebrood">Stonebrood</option>
                  <option value="⚠️ American Foulbrood">
                    American Foulbrood
                  </option>
                  <option value="⚠️ European Foulbrood">
                    European Foulbrood
                  </option>
                </Form.Select>
              </Form.Group>

              {/* Pests */}
              <Form.Group className="mb-3">
                {/* <Form.Label>Pests</Form.Label> */}
                <Form.Select
                  className="text-center text-white bg-inputgrey border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="pests"
                  name="pests"
                  onChange={handleChange}
                  value={formData.pests}
                >
                  <option>Pests</option>
                  <option value="No Pests">No Pests</option>
                  <option value="⚠️ Wax moths">Wax Moths</option>
                  <option value="⚠️ Mice">Mice</option>
                  <option value="⚠️ Hive Beetle">Hive Beetle</option>
                  <option value="⚠️ Ants">Ants</option>
                </Form.Select>
              </Form.Group>

              {/* Inspection Date */}
              <Form.Group className="mb-3">
                <Form.Label className="m-3 fs-3 mt-0 fw-semibold">
                  Date
                </Form.Label>
                <Form.Control
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  type="date"
                  id="inspectionDate"
                  name="inspectionDate"
                  onChange={handleChange}
                  value={formData.inspectionDate}
                />
              </Form.Group>

              {/* Inspection Note */}
              <Form.Group className="mb-3">
                <Form.Label className="m-3 fs-3 mt-0 fw-semibold">
                  Notes
                </Form.Label>
                <Form.Control
                  className="text-center text-white bg-inputgrey border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  as="textarea"
                  rows={2}
                  id="inspectionNote"
                  name="inspectionNote"
                  onChange={handleChange}
                  value={formData.inspectionNote}
                />
              </Form.Group>

              {/* Submit Button */}
              <Button
                type="submit"
                form="inspection-form"
                className="btn btn-michgold btn-gold rounded-pill"
              >
                UPDATE
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default EditInspection;

import { useState, useContext, useEffect } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, FloatingLabel } from "react-bootstrap";
import UserContext from "../../context/UserContext.jsx";

const InspectionForm = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(50);
  const [message, setMessage] = useState();
  const [hives, setHives] = useState([]);
  const [formData, setFormData] = useState({
    hiveId: "",
    hiveNumber: "",
    temperament: "",
    hiveStrength: 50,
    queen: "",
    queenCell: "",
    eggs: "",
    brood: "",
    disease: "",
    pests: "",
    feeding: "",
    treatments: "",
    inspectionDate: "",
    inspectionNote: "",
    userId: user._id,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/new-hive?userId=${user._id}`)
      .then((response) => {
        setHives(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hive data:", error);
        setLoading(false);
      });
  }, [user]);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10); // Parse slider value to integer
    setSliderValue(value); // Update slider value state
    setFormData((prevState) => ({
      ...prevState,
      hiveStrength: value, // Update hiveStrength state as number
    }));
  };

  const handleChange = (e) => {
    let { name, value, selectedIndex } = e.target;

    if (selectedIndex === 0) {
      value = "";
    }

    // Update formData state
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveInspection = (e) => {
    e.preventDefault();
    const selectedHive = JSON.parse(formData.hiveId);

    const data = {
      hiveNumber: selectedHive.hiveNumber,
      hiveId: selectedHive._id,
      temperament: formData.temperament,
      hiveStrength: formData.hiveStrength,
      queen: formData.queen,
      queenCell: formData.queenCell,
      brood: formData.brood,
      disease: formData.disease,
      eggs: formData.eggs,
      pests: formData.pests,
      feeding: formData.feeding,
      treatments: formData.treatments,
      inspectionDate: formData.inspectionDate,
      inspectionNote: formData.inspectionNote,
      userId: formData.userId,
    };
    axios
      .post("http://localhost:5555/inspections", data)
      .then(() => {
        setLoading(false);
        navigate("/inspections");
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
      <Container className="mt-2 mb-5" style={{ maxWidth: "700px" }}>
        <Card className="text-michgold text-center">
          <Card.Body>
            {/* Form */}
            <Form onSubmit={handleSaveInspection} id="inspection-form">
              {/* Hive Number */}
              <Form.Group className="m-3 fs-3 mt-0 fw-semibold">
                <div className="m-3 mt-0 fs-3 fw-semibold">
                  <Form.Label htmlFor="hiveId">Hive Number</Form.Label>
                  <Form.Select
                    id="hiveId"
                    className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    aria-label="select example"
                    name="hiveId"
                    value={formData.hiveId}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Hive Number
                    </option>
                    {hives.map((hive) => (
                      // By using JSON.stringify(hive) as the value of the <option>,
                      // we ensure that the entire hive object is associated with each dropdown option,
                      // enabling us to pass comprehensive hive data to the backend when the user makes a selection.
                      <option key={hive._id} value={JSON.stringify(hive)}>
                        {hive.hiveNumber}{" "}
                        {/* Display hive number to the user */}
                      </option>
                    ))}
                  </Form.Select>
                </div>
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
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Calm"
                    id="calm"
                    name="temperament"
                    value="Calm"
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Aggressive"
                    id="aggressive"
                    name="temperament"
                    value="⚠️ Aggressive"
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Active"
                    id="active"
                    name="temperament"
                    value="Active"
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
                    value="Eggs"
                  />
                </div>
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
                    value="⚠️ Queen Cells"
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
                  <option value="Normal Brood">Normal</option>
                  <option value="Spotty Brood">Spotty</option>
                  <option value="Compact Brood">Compact</option>
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

              {/* Feeding */}
              <Form.Group className="mb-3">
                {/* <Form.Label>Pests</Form.Label> */}
                <Form.Select
                  className="text-center text-white bg-inputgrey border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="feeding"
                  name="feeding"
                  onChange={handleChange}
                  value={formData.feeding}
                >
                  <option>Feeding</option>
                  <option value="Sugar">Sugar</option>
                  <option value="Fondant">Fondant</option>
                  <option value="Pollen Patty">Pollen Patty</option>
                  <option value="Syrup">Syrup</option>
                </Form.Select>
              </Form.Group>

              {/* Treatments */}
              <Form.Group className="mb-3">
                {/* <Form.Label>Pests</Form.Label> */}

                <Form.Select
                  className="text-center text-white bg-inputgrey border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="treatments"
                  name="treatments"
                  onChange={handleChange}
                  value={formData.treatments}
                >
                  <option>Treatments</option>
                  <option value="Oxalic Acid">Oxalic Acid</option>
                  <option value="Formic Acid">Formic Acid</option>
                  <option value="Apivar">Apivar</option>
                  <option value="Micribes">Microbes</option>
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
                  rows={5}
                  id="inspectionNote"
                  name="inspectionNote"
                  onChange={handleChange}
                  value={formData.inspectionNote}
                />
              </Form.Group>

              {/* Submit Button */}
              <p style={{ color: "#ab0a0a", textAlign: "center" }}>{message}</p>

              <Button
                type="submit"
                form="inspection-form"
                className="btn btn-michgold rounded-pill"
              >
                ADD
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default InspectionForm;

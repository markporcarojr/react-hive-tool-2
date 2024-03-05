import React, { useState } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";

const InspectionForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hiveNumber: "",
    temperament: "",
    hiveStrength: "",
    queen: false,
    queenCell: false,
    eggs: false,
    brood: "",
    disease: "",
    pests: "",
    inspectionDate: "",
    inspectionNote: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveInspection = (e) => {
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
      .post("http://localhost:5555/inspections", data)
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
      <Container className="mt-2 mb-5">
        <Card className="text-michgold text-center">
          <Card.Body>
            {/* Form */}
            <Form onSubmit={handleSaveInspection} id="inspection-form">
              {/* Hive Number */}
              <Form.Group className="m-3 fs-3 mt-0 fw-semibold">
                <Form.Label>Hive Number</Form.Label>
                <Form.Control
                  className="text-center bg-inputgrey border-3 border-michgold rounded-4 opacity-50 fw-bold"
                  type="number"
                  id="hiveNumber"
                  name="hiveNumber"
                  onChange={handleChange}
                  value={formData.hiveNumber}
                />
              </Form.Group>

              {/* Temperament */}
              <Form.Group className="m-3 fs-3 mt-0 fw-semibold">
                <Form.Label>Temperament</Form.Label>
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
                  value="✓ Calm"
                  onChange={handleChange}
                />
                {/* Add the other radio buttons similarly */}
              </Form.Group>

              {/* Hive Strength */}
              <Form.Group className="mb-3">
                <Form.Label>Hive Strength</Form.Label>
                <Form.Control
                  type="range"
                  id="hiveStrength"
                  name="hiveStrength"
                  min="0"
                  max="100"
                  onChange={handleChange}
                  value={formData.hiveStrength}
                />
                <Form.Text>{formData.hiveStrength}</Form.Text>
              </Form.Group>

              {/* Queen, Queen Cells, Eggs */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Queen Spotted"
                  id="queen"
                  name="queen"
                  checked={formData.queen}
                  onChange={handleChange}
                />
                {/* Add the other checkboxes similarly */}
              </Form.Group>

              {/* Brood */}
              <Form.Group className="mb-3">
                <Form.Label>Brood</Form.Label>
                <Form.Select
                  id="brood"
                  name="brood"
                  onChange={handleChange}
                  value={formData.brood}
                >
                  <option value="">Select Brood</option>
                  <option value="✓ Normal Brood">Normal</option>
                  {/* Add the other options similarly */}
                </Form.Select>
              </Form.Group>

              {/* Disease */}
              <Form.Group className="mb-3">
                <Form.Label>Disease</Form.Label>
                <Form.Select
                  id="disease"
                  name="disease"
                  onChange={handleChange}
                  value={formData.disease}
                >
                  <option value="">Select Disease</option>
                  <option value="No Diseases">No Diseases</option>
                  {/* Add the other options similarly */}
                </Form.Select>
              </Form.Group>

              {/* Pests */}
              <Form.Group className="mb-3">
                <Form.Label>Pests</Form.Label>
                <Form.Select
                  id="pests"
                  name="pests"
                  onChange={handleChange}
                  value={formData.pests}
                >
                  <option value="">Select Pests</option>
                  <option value="No Pests">No Pests</option>
                  {/* Add the other options similarly */}
                </Form.Select>
              </Form.Group>

              {/* Inspection Date */}
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  id="inspectionDate"
                  name="inspectionDate"
                  onChange={handleChange}
                  value={formData.inspectionDate}
                />
              </Form.Group>

              {/* Inspection Note */}
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
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

// const CreateInspection = () => {
//   const [hiveNumber, setHiveNumber] = useState(" ");
//   const [temperament, setTemperament] = useState(" ");
//   const [hiveStrength, setHiveStrength] = useState(50);
//   const [queen, setQueen] = useState(false);
//   const [queenCell, setQueenCell] = useState(false);
//   const [brood, setBrood] = useState(" ");
//   const [disease, setDisease] = useState(" ");
//   const [eggs, setEggs] = useState(false);
//   const [pests, setPests] = useState(" ");
//   const [inspectionDate, setInspectionDate] = useState(" ");
//   const [inspectionNote, setInspectionNote] = useState(" ");
//   const [sliderValue, setSliderValue] = useState(50);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSliderChange = (e) => {
//     const value = parseInt(e.target.value); // Parse slider value to integer
//     setSliderValue(value); // Update slider value state
//     setHiveStrength(value); // Update hiveStrength state
//   };

//   const handleSaveInspection = (e) => {
//     e.preventDefault();
//     const data = {
//       hiveNumber,
//       temperament,
//       hiveStrength,
//       queen,
//       queenCell,
//       brood,
//       disease,
//       eggs,
//       pests,
//       inspectionDate,
//       inspectionNote,
//     };
//     setLoading(true);
//     axios
//       .post("http://localhost:5555/inspections", data)
//       .then(() => {
//         setLoading(false);
//         navigate("/inspections");
//       })
//       .catch((error) => {
//         setLoading(false);
//         alert("An error has occurred. Please Check Console");
//         console.log(error);
//       });
//   };

//   return (
//     <>
//       <CustomNavbar />
//       return (
//       <Container className="mt-2 mb-5">
//         <Card className="text-michgold text-center">
//           <Card.Body>
//             {/* Form */}
//             <Form onSubmit={handleSubmit} id="inspection-form">
//               {/* Hive Number */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Hive Number</Form.Label>
//                 <Form.Control
//                   type="number"
//                   id="hiveNumber"
//                   name="hiveNumber"
//                   onChange={handleChange}
//                   value={formData.hiveNumber}
//                 />
//               </Form.Group>

//               {/* Temperament */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Temperament</Form.Label>
//                 <Form.Check
//                   type="radio"
//                   label="Dead"
//                   id="dead"
//                   name="temperament"
//                   value="⚠️ Dead"
//                   onChange={handleChange}
//                 />
//                 <Form.Check
//                   type="radio"
//                   label="Calm"
//                   id="calm"
//                   name="temperament"
//                   value="✓ Calm"
//                   onChange={handleChange}
//                 />
//                 <Form.Check
//                   type="radio"
//                   label="Calm"
//                   id="calm"
//                   name="temperament"
//                   value="✓ Calm"
//                   onChange={handleChange}
//                 />
//                 <Form.Check
//                   type="radio"
//                   label="Calm"
//                   id="calm"
//                   name="temperament"
//                   value="✓ Calm"
//                   onChange={handleChange}
//                 />
//                 {/* Add the other radio buttons similarly */}
//               </Form.Group>

//               {/* Hive Strength */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Hive Strength</Form.Label>
//                 <Form.Control
//                   type="range"
//                   id="hiveStrength"
//                   name="hiveStrength"
//                   min="0"
//                   max="100"
//                   onChange={handleChange}
//                   value={formData.hiveStrength}
//                 />
//                 <Form.Text>{formData.hiveStrength}</Form.Text>
//               </Form.Group>

//               {/* Queen, Queen Cells, Eggs */}
//               <Form.Group className="mb-3">
//                 <Form.Check
//                   type="checkbox"
//                   label="Queen Spotted"
//                   id="queen"
//                   name="queen"
//                   checked={formData.queen}
//                   onChange={handleChange}
//                 />
//                 {/* Add the other checkboxes similarly */}
//               </Form.Group>

//               {/* Brood */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Brood</Form.Label>
//                 <Form.Select
//                   id="brood"
//                   name="brood"
//                   onChange={handleChange}
//                   value={formData.brood}
//                 >
//                   <option value="">Select Brood</option>
//                   <option value="✓ Normal Brood">Normal</option>
//                   {/* Add the other options similarly */}
//                 </Form.Select>
//               </Form.Group>

//               {/* Disease */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Disease</Form.Label>
//                 <Form.Select
//                   id="disease"
//                   name="disease"
//                   onChange={handleChange}
//                   value={formData.disease}
//                 >
//                   <option value="">Select Disease</option>
//                   <option value="No Diseases">No Diseases</option>
//                   {/* Add the other options similarly */}
//                 </Form.Select>
//               </Form.Group>

//               {/* Pests */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Pests</Form.Label>
//                 <Form.Select
//                   id="pests"
//                   name="pests"
//                   onChange={handleChange}
//                   value={formData.pests}
//                 >
//                   <option value="">Select Pests</option>
//                   <option value="No Pests">No Pests</option>
//                   {/* Add the other options similarly */}
//                 </Form.Select>
//               </Form.Group>

//               {/* Inspection Date */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   id="inspectionDate"
//                   name="inspectionDate"
//                   onChange={handleChange}
//                   value={formData.inspectionDate}
//                 />
//               </Form.Group>

//               {/* Inspection Note */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Notes</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={2}
//                   id="inspectionNote"
//                   name="inspectionNote"
//                   onChange={handleChange}
//                   value={formData.inspectionNote}
//                 />
//               </Form.Group>

//               {/* Submit Button */}
//               <Button
//                 type="submit"
//                 form="inspection-form"
//                 className="btn btn-michgold btn-gold rounded-pill"
//               >
//                 ADD
//               </Button>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//       <Footer />
//     </>
//   );
// };

// export default CreateInspection;

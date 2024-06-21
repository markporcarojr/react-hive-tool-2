import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import UserContext from "../../context/UserContext.jsx";
import {
  uploadImageToStorage,
  deleteImageFromStorage,
} from "../../utils/firebaseUtils.js";

const EditInspectionForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [oldImageURL, setOldImageURL] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/inspections/${id}`)
      .then((res) => {
        const inspectionData = res.data;
        for (const key in inspectionData) {
          if (key !== "inspectionImage") {
            setValue(key, inspectionData[key]);
          }
        }
        setOldImageURL(inspectionData.inspectionImage);
        setSliderValue(inspectionData.hiveStrength);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hive data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user && user._id) {
      setValue("userId", user._id); // Set the userId field value
    }
  }, []);

  const placeholderOptions = {
    brood: "Select Brood Pattern",
    disease: "Select Diseases",
    pests: "Select Pests",
    feeding: "Select Feeding",
    treatments: "Select Treatment",
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10); // Parse slider value to integer
    setValue("hiveStrength", value);
    setSliderValue(value); // Update slider value state
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setValue("inspectionImage", file);
  };

  const handleEditInspection = async (data) => {
    setLoading(true);

    try {
      let imageUrl = oldImageURL; // Initialize imageUrl with the old image URL

      // Check if a new image has been uploaded
      if (data.inspectionImage) {
        // Upload the new image and get its URL
        imageUrl = await uploadImageToStorage(
          data.inspectionImage,
          "images/inspectionImages/"
        );
      }

      const formData = {
        ...data,
        eggs: data.eggs || "",
        queen: data.queen || "",
        queenCell: data.queenCell || "",
        userId: data.userId,
        inspectionImage: imageUrl,
      };

      axios.put(`http://localhost:5555/inspections/${id}`, formData);
      if (oldImageURL && data.inspectionImage) {
        // Delete the old image
        await deleteImageFromStorage(oldImageURL);
      }
      setLoading(false);
      setMessage("Inspection added successfully.");
      navigate("/inspections");
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.message || "An error occurred.");
      console.log("Error during inspection submission:", error);
    }
  };

  const hiveStrength = watch("hiveStrength", sliderValue);

  return (
    <>
      <CustomNavbar />
      {loading ? (
        <LoadSpinner />
      ) : (
        <Container
          style={{
            maxWidth: "700px",
            border: "3px solid #ffcb05",
            borderRadius: "1em",
          }}
          className="mt-5"
        >
          <Card className="text-michgold ">
            <Card.Body>
              {/* Form */}
              <h1 className="m-5 fw-bold text-center">EDIT INSPECTION</h1>
              <Form
                onSubmit={handleSubmit(handleEditInspection)}
                id="inspection-form"
              >
                <div className="text-center">
                  {/* Temperament */}
                  <Form.Group className="m-3 fs-4 mt-0 fw-semibold mb-3">
                    <Form.Label className="fs-3 m-3">Temperament</Form.Label>
                    <div className="d-flex justify-content-evenly">
                      <Form.Check
                        {...register("temperament", { required: true })}
                        type="radio"
                        label="Dead"
                        id="dead"
                        name="temperament"
                        value="⚠️ Dead"
                      />
                      <Form.Check
                        {...register("temperament", { required: true })}
                        type="radio"
                        label="Calm"
                        id="calm"
                        name="temperament"
                        value="Calm"
                      />
                      <Form.Check
                        {...register("temperament", { required: true })}
                        type="radio"
                        label="Aggressive"
                        id="aggressive"
                        name="temperament"
                        value="⚠️ Aggressive"
                      />
                      <Form.Check
                        {...register("temperament", { required: true })}
                        type="radio"
                        label="Active"
                        id="active"
                        name="temperament"
                        value="Active"
                      />
                    </div>
                    {errors.temperament && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
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
                      {...register("hiveStrength", { required: true })}
                      type="range"
                      className="m-3 custom-range"
                      min="0"
                      max="100"
                      id="hiveStrength"
                      name="hiveStrength"
                      style={{ minWidth: "60%", flex: 3 }}
                      onChange={handleSliderChange}
                    />
                    <div style={{ flex: 1 }}>
                      <span id="sliderValue" className="mt-3">
                        {hiveStrength}
                      </span>
                    </div>
                    {errors.temperament && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                {/* Queen, Queen Cells, Eggs */}
                <Form.Group className="mb-3">
                  <div className="ps-0 form-check d-flex justify-content-between">
                    <label className="fs-3 mb-0 mx-3" htmlFor="eggs">
                      Eggs
                    </label>
                    <Form.Check
                      {...register("eggs")}
                      className="fs-2 mb-0"
                      type="checkbox"
                      id="eggs"
                      name="eggs"
                      value="Eggs"
                    />
                  </div>
                  <div className="ps-0 form-check d-flex justify-content-between">
                    <label className="fs-3 mb-0 mx-3" htmlFor="queen">
                      Queen Spotted
                    </label>
                    <Form.Check
                      {...register("queen")}
                      className="fs-2 mb-0"
                      type="checkbox"
                      id="queen"
                      name="queen"
                      value="Queen Present"
                    />
                  </div>

                  <div className="ps-0 form-check d-flex justify-content-between">
                    <label className="fs-3 mb-0 mx-3" htmlFor="queenCell">
                      Queen Cells
                    </label>
                    <Form.Check
                      {...register("queenCell")}
                      className="fs-2 mb-0"
                      type="checkbox"
                      id="queenCell"
                      name="queenCell"
                      value="⚠️ Queen Cells"
                    />
                  </div>
                </Form.Group>

                {/* Brood */}
                <Form.Group className="mb-3">
                  <Form.Label className="fs-3 m-3 fw-semibold">
                    Brood Pattern
                  </Form.Label>
                  <Form.Select
                    {...register("brood")}
                    className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    id="brood"
                    aria-label="select example"
                    name="brood"
                  >
                    <option value="Normal Brood">Normal</option>
                    <option value="Spotty Brood">Spotty</option>
                    <option value="Compact Brood">Compact</option>
                  </Form.Select>
                </Form.Group>

                {/* Disease */}
                <Form.Group className="mb-3">
                  <Form.Label className="fs-3 m-3 fw-semibold">
                    Diseases
                  </Form.Label>
                  <Form.Select
                    {...register("disease")}
                    className="text-center text-white bg-inputgrey border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    id="disease"
                    aria-label="select example"
                    name="disease"
                  >
                    <option value="">No Diseases</option>
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
                  <Form.Label className="fs-3 m-3 fw-semibold">
                    Pests
                  </Form.Label>
                  <Form.Select
                    {...register("pests")}
                    className="text-center text-white bg-inputgrey border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    id="pests"
                    aria-label="select example"
                    name="pests"
                  >
                    <option value="">No Pests</option>
                    <option value="⚠️ Wax moths">Wax Moths</option>
                    <option value="⚠️ Mice">Mice</option>
                    <option value="⚠️ Hive Beetle">Hive Beetle</option>
                    <option value="⚠️ Ants">Ants</option>
                  </Form.Select>
                </Form.Group>

                {/* Feeding */}
                <Form.Group className="mb-3">
                  <Form.Label className="fs-3 m-3 fw-semibold">
                    Feeding
                  </Form.Label>
                  <Form.Select
                    {...register("feeding")}
                    className="text-center text-white bg-inputgrey border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    id="feeding"
                    aria-label="select example"
                    name="feeding"
                  >
                    <option value="">No Feeding</option>
                    <option value="Fondant">Fondant</option>
                    <option value="Pollen Patty">Pollen Patty</option>
                    <option value="Syrup">Syrup</option>
                  </Form.Select>
                </Form.Group>

                {/* Treatments */}
                <Form.Group>
                  <Form.Label className="fs-3 m-3 fw-semibold">
                    Treatments
                  </Form.Label>

                  <Form.Select
                    {...register("treatments")}
                    className="text-center text-white bg-inputgrey border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    id="treatments"
                    name="treatments"
                  >
                    <option value="" disabled>
                      Select Treatment
                    </option>
                    <option value="">No Treatment</option>
                    <option value="Oxalic Acid">Oxalic Acid</option>
                    <option value="Formic Acid">Formic Acid</option>
                    <option value="Apivar">Apivar</option>
                    <option value="Micribes">Microbes</option>
                  </Form.Select>
                </Form.Group>

                {/* Inspection Image */}
                <Form.Group className="mb-3">
                  <Form.Label className="m-3 fs-3 fw-semibold">
                    Inspection Image
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    capture="camera"
                    className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    id="inspectionImage"
                    name="inspectionImage"
                    onChange={handleImageUpload}
                    aria-describedby="inspectionImage"
                  />
                </Form.Group>
                {/* Inspection Date */}
                <Form.Group className="mb-3">
                  <Form.Label className="m-3 fs-3 mt-0 fw-semibold">
                    Date
                  </Form.Label>
                  <Form.Control
                    {...register("inspectionDate", { required: true })}
                    className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    type="date"
                    id="inspectionDate"
                    name="inspectionDate"
                  />
                  {errors.inspectionDate && (
                    <span className="text-danger">This field is required</span>
                  )}
                </Form.Group>

                {/* Inspection Note */}
                <Form.Group className="mb-3">
                  <Form.Label className="m-3 fs-3 mt-0 fw-semibold">
                    Notes
                  </Form.Label>
                  <Form.Control
                    {...register("inspectionNote")}
                    className="text-center text-white bg-inputgrey border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    as="textarea"
                    rows={5}
                    id="inspectionNote"
                    name="inspectionNote"
                  />
                </Form.Group>

                {/* Submit Button */}
                <p style={{ color: "#ab0a0a", textAlign: "center" }}>
                  {message}
                </p>
                <input type="hidden" {...register("userId")} />

                <div className="d-flex justify-content-around">
                  <Button
                    type="submit"
                    form="inspection-form"
                    className="btn px-5 btn-michgold fw-bold rounded-pill"
                  >
                    UPDATE
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default EditInspectionForm;

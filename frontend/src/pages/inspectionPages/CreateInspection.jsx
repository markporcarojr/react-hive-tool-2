import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../../components/layout/CustomNavbar";
import Footer from "../../components/layout/Footer";
import LoadSpinner from "../../components/Spinner";
import UserContext from "../../context/UserContext.jsx";
import fetchWeatherData from "../../utils/fetchWeatherData.js";
import { uploadUserImageToStorage } from "../../utils/firebaseUtils.js";

const InspectionForm = () => {
  const curr = new Date();
  // Create the current date as a local date string in the format yyyy-mm-dd
  const currentDate = curr.toISOString().split("T")[0];

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [hives, setHives] = useState([]);
  const [weatherData, setWeatherData] = useState("");
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [weatherTemp, setWeatherTemp] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/new-hive?userId=${user._id}`)
      .then((response) => {
        setHives(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hive data:", error);
        setLoading(false);
      });

    if (user && user._id) {
      setValue("userId", user._id); // Set the userId field value
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (user && user.zipcode) {
        const weather = await fetchWeatherData(user.zipcode);
        if (weather) {
          const weatherConditionValue = weather.data.weather[0].description;
          const weatherTempValue = Math.floor(weather.data.main.temp);

          setWeatherData(weather.data);
          setWeatherTemp(weatherTempValue);
          setWeatherCondition(weatherConditionValue);
          setValue("weatherTemp", weatherTempValue);
          setValue("weatherCondition", weatherConditionValue);
        }
      }
    };

    fetchWeather();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleWeatherConditionChange = (e) => {
    setWeatherCondition(e.target.value);
    setValue("weatherCondition", e.target.value);
  };
  const handleWeatherTempChange = (e) => {
    setWeatherTemp(e.target.value);
    setValue("weatherTemp", e.target.value);
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10); // Parse slider value to integer
    setValue("hiveStrength", value);
    setSliderValue(value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setValue("inspectionImage", file);
  };

  const handleSaveInspection = async (data) => {
    setLoading(true);
    const selectedHive = JSON.parse(data.hiveId);

    try {
      let imageUrl = null;
      // Check if an image is selected
      if (data.inspectionImage) {
        // Upload image to Firebase Storage
        imageUrl = await uploadUserImageToStorage(
          data.inspectionImage,
          user._id
        );
      }

      const formData = {
        ...data,
        eggs: data.eggs || "",
        queen: data.queen || "",
        queenCell: data.queenCell || "",
        hiveNumber: selectedHive.hiveNumber,
        hiveId: selectedHive._id,
        userId: data.userId,
        inspectionImage: imageUrl,
      };

      axios.post(`${import.meta.env.VITE_BACKEND_API}/inspections`, formData);
      setLoading(false);
      setMessage("Inspection added successfully.");
      navigate("/inspections");
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.message || "An error occurred.");
      console.log("Error during inspection submission:", error);
    }
  };

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
              <h1 className="m-5 fw-bold text-center">NEW INSPECTION</h1>
              <p className="text-center mb-5">* Required Fields</p>
              <Form
                onSubmit={handleSubmit(handleSaveInspection)}
                id="inspection-form"
              >
                {/* Hive Number */}
                <div className="text-center">
                  <Form.Group className="m-3 fs-3 mt-0 fw-semibold">
                    <div className="m-3 mt-0 fs-3 fw-semibold">
                      <Form.Label htmlFor="hiveId">* Hive Number</Form.Label>
                      <Form.Select
                        {...register("hiveId", { required: true })}
                        id="hiveId"
                        className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                        aria-label="select example"
                        name="hiveId"
                      >
                        <option value="" disabled>
                          Select Hive Number
                        </option>
                        {hives.map((hive) => (
                          // By using JSON.stringify(hive) as the value of the <option>,
                          // we ensure that the entire hive object is associated with each dropdown option,
                          // enabling us to pass hive data to the backend when the user makes a selection.
                          <option key={hive._id} value={JSON.stringify(hive)}>
                            {hive.hiveNumber}
                            {/* Display hive number to the user */}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                    {errors.hiveId && (
                      <span className="fs-5 text-danger m-3 text-center">
                        Hive Number is required
                      </span>
                    )}
                  </Form.Group>
                  {/* Temperament */}

                  <Form.Group className="m-3 fs-3 mt-0 fw-semibold">
                    <Form.Label className="fs-3 m-3 fw-semibold">
                      * Temperament
                    </Form.Label>
                    <Form.Select
                      {...register("temperament", { required: true })}
                      className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                      id="temperament"
                      name="temperament"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Temperament
                      </option>
                      <option value="⚠️ Dead">Dead</option>
                      <option value="Calm">Calm</option>
                      <option value="Active">Active</option>
                      <option value="⚠️ Aggressive">Aggressive</option>
                    </Form.Select>
                    {errors.temperament && (
                      <p className="fs-5 text-danger m-3 text-center">
                        Temperament is required
                      </p>
                    )}
                  </Form.Group>
                  {/* Hive Strength */}
                  <label
                    htmlFor="hiveStrength"
                    className="form-label my-1 fs-3 fw-semibold"
                  >
                    * Hive Strength
                  </label>
                  <div className="d-flex justify-content-evenly mb-3">
                    <p className="mt-3" style={{ flex: 1 }}>
                      0
                    </p>
                    <input
                      {...register("hiveStrength")}
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
                        {sliderValue}
                      </span>
                    </div>
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
                      className="fs-3 mb-0"
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
                      className="fs-3 mb-0"
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
                      className="fs-3 mb-0"
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
                    name="brood"
                  >
                    <option value="" disabled>
                      Select Brood Pattern
                    </option>
                    <option value="">N/A</option>
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
                    name="disease"
                  >
                    <option value="" disabled>
                      Select Diseases
                    </option>
                    <option value="">No Diseases</option>
                    <option value="⚠️ Chalkbrood">Chalkbrood</option>
                    <option value="⚠️ Nosema">Nosema</option>
                    <option value="⚠️ Varroa Mites">Varroa Mites</option>
                    <option value="⚠️ Stonebrood">Stonebrood</option>
                    <option value="⚠️ American Foulbrood">
                      American Foulbrood (AFB)
                    </option>
                    <option value="⚠️ European Foulbrood">
                      European Foulbrood (EFB)
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
                    name="pests"
                  >
                    <option value="" disabled>
                      Select Pests
                    </option>
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
                    name="feeding"
                  >
                    <option value="" disabled>
                      Select Feeding
                    </option>
                    <option value="">No Feeding</option>
                    <option value="Sugar">Sugar</option>
                    <option value="Fondant">Fondant</option>
                    <option value="Pollen Patty">Pollen Patty</option>
                    <option value="Syrup">Syrup</option>
                  </Form.Select>
                </Form.Group>

                {/* Treatments */}
                <Form.Group className="mb-3">
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
                <Form.Group>
                  <Form.Label className="m-3 fs-3 mt-3 fw-semibold">
                    Inspection Image
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    id="inspectionImage"
                    name="inspectionImage"
                    onChange={handleImageUpload}
                    aria-describedby="inspectionImage"
                  />
                </Form.Group>
                {/* Inspection Date */}
                <Form.Group className="mb-">
                  <Form.Label className="m-3 fs-3 mt-3 fw-semibold">
                    * Date
                  </Form.Label>
                  <Form.Control
                    {...register("inspectionDate", { required: true })}
                    className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    type="date"
                    id="inspectionDate"
                    name="inspectionDate"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                  {errors.inspectionDate && (
                    <p className="fs-5 text-danger m-3 text-center">
                      Date is required
                    </p>
                  )}
                </Form.Group>
                {/* Weather Temperature */}
                <Form.Group className="mb-">
                  <Form.Label className="m-3 fs-3 mt-3 fw-semibold">
                    Temperature (℉)
                  </Form.Label>
                  <Form.Control
                    {...register("weatherTemp", { required: false })}
                    className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    type="text"
                    id="weatherTemp"
                    name="weatherTemp"
                    onChange={handleWeatherTempChange}
                    value={weatherTemp}
                  />
                </Form.Group>
                {/* Weather Conditions */}

                <Form.Group className="mb-3">
                  <Form.Label className="m-3 fs-3 mt-3 fw-semibold">
                    Weather Conditions
                  </Form.Label>
                  <Form.Control
                    {...register("weatherCondition", { required: false })}
                    className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    type="text"
                    id="weatherCondition"
                    name="weatherCondition"
                    onChange={handleWeatherConditionChange}
                    value={weatherCondition}
                  />
                </Form.Group>

                {/* Inspection Note */}
                <Form.Group className="mb-3">
                  <Form.Label className="m-3 fs-3 mt-3 fw-semibold">
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

                <div className="d-flex justify-content-around m-5">
                  <Button
                    type="submit"
                    form="inspection-form"
                    className="btn px-5 btn-michgold fw-bold rounded-pill"
                  >
                    ADD
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

export default InspectionForm;

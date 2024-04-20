import { useState, useContext } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext.jsx";
import { uploadImageToStorage } from "../../utils/firebaseUtils.js";

const CreateHive = () => {
  const [breed, setBreed] = useState("");
  const [hiveNumber, setHiveNumber] = useState("");
  const [hiveSource, setHiveSource] = useState("");
  const [hiveStrength, setHiveStrength] = useState(50);
  const [hiveDate, setHiveDate] = useState("");
  const [sliderValue, setSliderValue] = useState(50);
  const [queenColor, setQueenColor] = useState("");
  const [queenAge, setQueenAge] = useState("");
  const [hiveImage, setHiveImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10); // Parse slider value to integer
    setSliderValue(value);
    setHiveStrength(value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setHiveImage(file);
  };

  const handleSaveHive = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload image to Firebase Storage
      const imageUrl = await uploadImageToStorage(hiveImage, "images/");

      const data = {
        hiveNumber,
        breed,
        hiveStrength,
        hiveSource,
        queenColor,
        queenAge,
        hiveDate,
        userId: user._id,
        hiveImage: imageUrl,
      };

      // Send data to backend API
      await axios.post("http://localhost:5555/new-hive", data);
      setLoading(false);
      setMessage("Hive added successfully.");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || "An error occurred.");
      console.error(error);
    }
  };

  return (
    <>
      <CustomNavbar />
      {loading && <LoadSpinner />}
      <div className="container" style={{ maxWidth: "700px" }}>
        <div className="card text-michgold text-center mt-2 mb-5">
          <form id="hive-form">
            <div className="m-3 fs-3 mt-0 fw-semibold ">
              <label htmlFor="hiveNumber" className="form-label">
                Hive Number
              </label>
              <input
                type="number"
                className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                id="hiveNumber"
                name="hiveNumber"
                value={hiveNumber}
                onChange={(e) => setHiveNumber(e.target.value)}
                aria-describedby="hiveNumber"
              />
            </div>
            <div className="m-3 fs-3 mt-0 fw-semibold text-center ">
              <label htmlFor="hiveSource" className="form-label mb-3">
                Hive Source
              </label>
              <select
                name="hiveSource"
                id="hiveSource"
                className="form-select mb-2 text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                value={hiveSource}
                onChange={(e) => setHiveSource(e.target.value)}
              >
                <option className="text-center">Choose Source</option>
                <option value="Nucleus">Nucleus</option>
                <option value="Package">Package</option>
                <option value="Capture Swarm">Capture Swarm</option>
                <option value="Split">Split</option>
              </select>
              <label htmlFor="breed" className="form-label m-3">
                Breed
              </label>
              <select
                name="breed"
                id="breed"
                className="form-select mb-2 text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              >
                <option className="text-center">Choose Breed</option>
                <option value="Unknown">Unknown</option>
                <option value="Italian">Italian</option>
                <option value="Carniolan">Carniolan</option>
                <option value="Buckfast">Buckfast</option>
                <option value="Russian">Russian</option>
                <option value="German">German</option>
                <option value="Caucasian">Caucasian</option>
              </select>
              <label htmlFor="queenColor" className="form-label m-3">
                Queen Color
              </label>
              <input
                type="text"
                className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                id="queenColor"
                name="queenColor"
                value={queenColor}
                onChange={(e) => setQueenColor(e.target.value)}
                aria-describedby="queenColor"
              />
              <label htmlFor="queenAge" className="form-label m-3">
                Queen Age
              </label>
              <input
                type="number"
                className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                id="queenAge"
                name="queenAge"
                value={queenAge}
                onChange={(e) => setQueenAge(e.target.value)}
                aria-describedby="queenAge"
              />
              <label htmlFor="hiveImage" className="form-label m-3">
                Hive Image
              </label>
              <input
                type="file"
                accept="image/*"
                capture="camera"
                className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                id="hiveImage"
                name="hiveImage"
                // value={hiveImage}
                onChange={handleImageUpload}
                aria-describedby="hiveImage"
              />
              <label
                htmlFor="hiveDate"
                className="form-label fs-3 fw-semibold my-3"
              >
                Date
              </label>
              <input
                type="date"
                className="form-control text-center bg-inputgrey border-3 text-white border-michgold rounded-4 opacity-85 fw-bold"
                id="hiveDate"
                name="hiveDate"
                value={hiveDate}
                onChange={(e) => setHiveDate(e.target.value)}
              />
            </div>
            {/* <!-- Form end --> */}

            {/* <!-- Hive Range --> */}
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
                value={hiveStrength}
                onChange={handleSliderChange}
              />

              <div style={{ flex: 1 }}>
                <span id="sliderValue" className="mt-3">
                  {sliderValue}
                </span>
              </div>
            </div>
          </form>
          <div className="d-flex justify-content-around mb-3">
            <button
              type="submit"
              form="hive-form"
              className="btn px-5 btn-michgold fw-bold rounded-pill"
              onClick={handleSaveHive}
            >
              ADD
            </button>
          </div>
          <p style={{ color: "#ab0a0a", textAlign: "center" }}>{message}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateHive;

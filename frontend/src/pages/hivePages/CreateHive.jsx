import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext.jsx";
import { uploadImageToStorage } from "../../utils/firebaseUtils.js";

const CreateHive = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(50);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("hiveStrength", 50);
  }, [setValue]);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setValue("hiveStrength", value);
    setSliderValue(value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setValue("hiveImage", file);
  };

  const handleSaveHive = async (data) => {
    setLoading(true);
    setMessage(""); // Clear previous messages
    try {
      let imageUrl = "";
      if (data.hiveImage) {
        imageUrl = await uploadImageToStorage(
          data.hiveImage,
          "images/hiveImages/"
        );
      }

      const formData = {
        ...data,
        userId: user._id,
        hiveImage: imageUrl || null, // If no image is uploaded, set hiveImage to null
      };

      await axios.post("http://localhost:5555/new-hive", formData);
      setLoading(false);
      setMessage("Hive added successfully.");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <>
      <CustomNavbar />
      {loading && <LoadSpinner />}
      {!loading && (
        <div className="container" style={{ maxWidth: "700px" }}>
          <div className="card text-michgold text-center mt-2 mb-5">
            <h1 className="m-5">ADD HIVE</h1>
            <form id="hive-form" onSubmit={handleSubmit(handleSaveHive)}>
              <div className="m-3 fs-3 mt-0 fw-semibold">
                <label htmlFor="hiveNumber" className="form-label">
                  Hive Number
                </label>
                <input
                  type="number"
                  {...register("hiveNumber", { required: true })}
                  className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="hiveNumber"
                  name="hiveNumber"
                  aria-describedby="hiveNumber"
                />
                {errors.hiveNumber && (
                  <p className="text-danger">Hive Number is required</p>
                )}
              </div>
              <div className="m-3 fs-3 mt-0 fw-semibold text-center">
                <label htmlFor="hiveSource" className="form-label mb-3">
                  Hive Source
                </label>
                <select
                  {...register("hiveSource", { required: true })}
                  name="hiveSource"
                  id="hiveSource"
                  className="form-select mb-2 text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                >
                  <option className="text-center">Choose Source</option>
                  <option value="Nucleus">Nucleus</option>
                  <option value="Package">Package</option>
                  <option value="Capture Swarm">Capture Swarm</option>
                  <option value="Split">Split</option>
                </select>
                {errors.hiveSource && (
                  <p className="text-danger">Hive Source is required</p>
                )}

                <label htmlFor="breed" className="form-label m-3">
                  Breed
                </label>
                <select
                  {...register("breed")}
                  name="breed"
                  id="breed"
                  className="form-select mb-2 text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
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
                  {...register("queenColor")}
                  type="text"
                  className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="queenColor"
                  name="queenColor"
                  aria-describedby="queenColor"
                />

                <label htmlFor="queenAge" className="form-label m-3">
                  Queen Age
                </label>
                <input
                  {...register("queenAge")}
                  type="number"
                  className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="queenAge"
                  name="queenAge"
                  aria-describedby="queenAge"
                />

                <label htmlFor="queenExcluder" className="form-label m-3">
                  Queen Excluder
                </label>
                <select
                  {...register("queenExcluder")}
                  name="queenExcluder"
                  id="queenExcluder"
                  className="form-select  text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                >
                  <option className="text-center" disabled selected>
                    --
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                <label htmlFor="broodBoxes" className="form-label m-3">
                  Number of Brood Boxes
                </label>
                <input
                  {...register("broodBoxes")}
                  type="number"
                  className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="broodBoxes"
                  name="broodBoxes"
                  aria-describedby="broodBoxes"
                />

                <label htmlFor="superBoxes" className="form-label m-3">
                  Number of Super Boxes
                </label>
                <input
                  {...register("superBoxes")}
                  type="number"
                  className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="superBoxes"
                  name="superBoxes"
                  aria-describedby="superBoxes"
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
                  {...register("hiveDate", { required: true })}
                  type="date"
                  className="form-control text-center bg-inputgrey border-3 text-white border-michgold rounded-4 opacity-85 fw-bold"
                  id="hiveDate"
                  name="hiveDate"
                />
                {errors.hiveDate && (
                  <p className="text-danger">Date is required</p>
                )}
              </div>

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
                    {sliderValue}
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-around mb-3">
                <button
                  type="submit"
                  form="hive-form"
                  className="btn px-5 btn-michgold fw-bold rounded-pill"
                >
                  ADD
                </button>
              </div>
            </form>
            <p style={{ color: "#ab0a0a", textAlign: "center" }}>{message}</p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CreateHive;

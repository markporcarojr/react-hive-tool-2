import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import CustomNavbar from "../../components/layout/CustomNavbar";
import Footer from "../../components/layout/Footer";
import LoadSpinner from "../../components/Spinner";
import UserContext from "../../context/UserContext.jsx";
import {
  deleteImageFromStorage,
  uploadUserImageToStorage,
} from "../../utils/firebaseUtils.js";

const EditHive = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [oldImageURL, setOldImageURL] = useState("");
  const [sliderValue, setSliderValue] = useState(50);
  const [hiveNumber, setHiveNumber] = useState("");

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
      .get(`${import.meta.env.VITE_BACKEND_API}/new-hive/${id}`)
      .then((res) => {
        // this helped clean up the code!
        const hiveData = res.data;
        setHiveNumber(hiveData.hiveNumber);
        for (const key in hiveData) {
          setValue(key, hiveData[key]);
        }
        setSliderValue(hiveData.hiveStrength);
        setOldImageURL(hiveData.hiveImage);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error fetching data:", error);
        setMessage(error.response.data.message);
      });
  }, []);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setValue("hiveStrength", value);
    setSliderValue(value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setValue("hiveImage", file);
  };

  const handleEditHive = async (data) => {
    setLoading(true);
    setMessage(""); // Clear previous messages
    try {
      let imageUrl = oldImageURL;
      if (data.hiveImage && data.hiveImage instanceof File) {
        imageUrl = await uploadUserImageToStorage(data.hiveImage, user._id);
      }

      const formData = {
        ...data,
        userId: user._id,
        hiveImage: imageUrl, // Use the new or old image URL
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/new-hive/${id}`,
        formData
      );

      if (oldImageURL && data.hiveImage instanceof File) {
        // Delete the old image only if a new image was uploaded
        await deleteImageFromStorage(oldImageURL);
      }

      setLoading(false);
      setMessage("Hive updated successfully.");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  const hiveStrength = watch("hiveStrength", sliderValue);

  return (
    <>
      <CustomNavbar />
      {loading && <LoadSpinner />}
      {!loading && (
        <Container
          style={{
            maxWidth: "700px",
            border: "3px solid #ffcb05",
            borderRadius: "1em",
          }}
          className="mt-5"
        >
          <div>
            <div className="mt-3 text-center">
              <BackButton text={"BACK"} />
            </div>
            <div className="card text-michgold  mt-2 mb-5">
              <h1 className="m-5 fw-bold text-center">
                EDIT HIVE #{hiveNumber}
              </h1>
              <p className="text-center">* Required Fields</p>

              <form id="hive-form" onSubmit={handleSubmit(handleEditHive)}>
                <div className="m-3 fs-3 mt-0 fw-semibold ">
                  <label htmlFor="hiveSource" className="form-label m-3">
                    * Hive Source
                  </label>
                  <select
                    {...register("hiveSource", { required: true })}
                    name="hiveSource"
                    id="hiveSource"
                    className="form-select mb-2 text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  >
                    <option value="">Choose Source</option>
                    <option value="Nucleus">Nucleus</option>
                    <option value="Package">Package</option>
                    <option value="Capture Swarm">Capture Swarm</option>
                    <option value="Split">Split</option>
                  </select>
                  {errors.hiveSource && (
                    <p className="fs-5 text-danger m-3 text-center">
                      Hive Source is required
                    </p>
                  )}

                  <label htmlFor="frames" className="form-label m-3">
                    Number of frames
                  </label>
                  <input
                    {...register("frames")}
                    type="number"
                    className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    id="frames"
                    name="frames"
                    aria-describedby="frames"
                  />

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
                    <option value="">Select an option</option>
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
                    className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    id="hiveImage"
                    name="hiveImage"
                    onChange={handleImageUpload}
                  />

                  <label
                    htmlFor="hiveDate"
                    className="form-label fs-3 fw-semibold m-3"
                  >
                    * Date
                  </label>
                  <input
                    {...register("hiveDate", { required: true })}
                    type="date"
                    className="form-control text-center bg-inputgrey border-3 text-white border-michgold rounded-4 opacity-85 fw-bold"
                    id="hiveDate"
                    name="hiveDate"
                  />
                  {errors.hiveDate && (
                    <p className="fs-5 text-danger m-3 text-center">
                      Date is required
                    </p>
                  )}
                </div>

                <div className="text-center">
                  <label
                    htmlFor="hiveStrength"
                    className="form-label m-3 text-center fs-3 fw-semibold"
                  >
                    Hive Strength
                  </label>
                </div>
                <div className="d-flex justify-content-evenly mb-3">
                  <p className="m-3" style={{ flex: 1 }}>
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
                      {hiveStrength}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-around mt-5">
                  <button
                    type="submit"
                    form="hive-form"
                    className="btn px-5 btn-michgold fw-bold rounded-pill"
                  >
                    UPDATE
                  </button>
                </div>
              </form>
              <p style={{ color: "#ab0a0a", textAlign: "center" }}>{message}</p>
            </div>
          </div>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default EditHive;

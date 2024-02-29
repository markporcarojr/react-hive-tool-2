import React, { useState } from "react";
import CustomNavbar from "../components/CustomNavbar";
import Footer from "../components/Footer";
import LoadSpinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateHive = () => {
  const [hiveNumber, setHiveNumber] = useState(" ");
  const [breed, setBreed] = useState(" ");
  const [hiveStrength, setHiveStrength] = useState(50);
  const [hiveDate, setHiveDate] = useState(" ");
  const [sliderValue, setSliderValue] = useState(50);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value); // Parse slider value to integer
    setSliderValue(value); // Update slider value state
    setHiveStrength(value); // Update hiveStrength state
  };

  const handleSaveHive = (e) => {
    e.preventDefault();
    const data = {
      hiveNumber,
      breed,
      hiveStrength,
      hiveDate,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/new-hive", data)
      .then(() => {
        setLoading(false);
        navigate("/");
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
      <div className="container" style={{ maxWidth: "700px" }}>
        <div className="card text-michgold text-center mt-2 mb-5">
          <form id="hive-form">
            <div className="m-3 fs-3 mt-0 fw-semibold ">
              <label htmlFor="hiveNumber" className="form-label">
                Hive Number
              </label>
              <input
                type="number"
                className="form-control text-center bg-inputgrey border-3 border-michgold rounded-4 opacity-80 fw-bold"
                id="hiveNumber"
                name="hiveNumber"
                value={hiveNumber}
                onChange={(e) => setHiveNumber(e.target.value)}
                aria-describedby="hiveNumber"
              />
            </div>
            <div className="m-3 fs-3 mt-0 fw-semibold text-center ">
              <label htmlFor="breed" className="form-label mb-3">
                Breed
              </label>
              <select
                name="breed"
                id="breed"
                className="form-select mb-2 text-center bg-inputgrey border-3 border-michgold rounded-4 opacity-80 fw-bold"
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
              <label
                htmlFor="hiveDate"
                className="form-label fs-3 fw-semibold my-3"
              >
                Date
              </label>
              <input
                type="date"
                className="form-control text-center bg-inputgrey border-3 border-michgold rounded-4 opacity-80 fw-bold"
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
              className="btn px-5 btn-michgold btn-gold fw-bold rounded-pill"
              onClick={handleSaveHive}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateHive;

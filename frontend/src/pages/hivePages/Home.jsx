import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadSpinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import HiveCard from "../../components/HiveCard"; // Import HiveCard component

const Home = () => {
  const [hives, setHives] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/new-hive")
      .then((response) => {
        setHives(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hive data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <CustomNavbar />
      <div id="title" className="container title">
        <h1 className="text-center text-white pt-2 outlined-text display-1 fw-bold apiary">
          Owen Rd Apiary
        </h1>
        <h5 className="card-title mt-3 fs-2 outlined-text" id="datetime"></h5>
        <div className="d-flex justify-content-between text-white align-items-center outlined-text fs-3 fw-bold my-1 me-2">
          <span className="card-text mb-0 ms-2 mt-" id="city">
            Ortonville
          </span>
          <div>
            <span className="card-text mb-0 text-white">☀️</span>
            <span className="card-text mb-0" id="temp">
              60℉
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="d-flex justify-content-around mb-3">
          <Link
            to="/hives/create/"
            className="btn btn-warning rounded-pill fw-bold "
          >
            ADD HIVE
          </Link>
        </div>

        {loading ? (
          <LoadSpinner />
        ) : (
          <div className="row row-cols-1 row-cols-lg-3 g-2">
            {hives.map((hive) => (
              <HiveCard key={hive._id} hive={hive} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
// test commit
// test 2
// teset 3

export default Home;

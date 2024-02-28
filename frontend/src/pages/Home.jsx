import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadSpinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import CustomNavbar from "../components/CustomNavbar";
import Footer from "../components/Footer";
import HiveCard from "../components/HiveCard"; // Import HiveCard component

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
      <div className="p-4">
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

export default Home;

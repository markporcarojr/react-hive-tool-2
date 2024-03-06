import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadSpinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import InspectionCard from "../../components/InspectionCard"; // Import InspectionCard component

const InspectionPage = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/inspections") // Assuming this is the correct endpoint to fetch inspections
      .then((response) => {
        setInspections(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inspection data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <CustomNavbar />
      <div id="title" className="container title">
        {/* Title section */}
      </div>
      <div className="p-4">
        <div className="d-flex justify-content-around mb-3">
          <Link
            to="/inspections/create"
            className="btn btn-warning rounded-pill fw-bold"
          >
            ADD INSPECTION
          </Link>
        </div>

        {loading ? (
          <LoadSpinner />
        ) : (
          <div className="row row-cols-1 row-cols-lg-3 g-2">
            {inspections.map((inspection) => (
              <InspectionCard key={inspection._id} inspection={inspection} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default InspectionPage;

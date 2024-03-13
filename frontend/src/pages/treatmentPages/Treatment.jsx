import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import LoadSpinner from "../../components/Spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import TreatmentCard from "../../components/TreatmentCard";

export default function Treatment() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/treatments")
      .then((response) => {
        setTreatments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <CustomNavbar />
      <div className="p-4">
        <div className="d-flex justify-content-around mb-3">
          <Link
            to="/treatments/create"
            className="btn btn-warning rounded-pill fw-bold"
          >
            ADD TREATMENT
          </Link>
        </div>
        {loading ? (
          <LoadSpinner />
        ) : (
          <div className="row row-cols-1 row-cols-lg-3 g-2">
            {treatments.map((treatment) => (
              <TreatmentCard key={treatment._id} treatment={treatment} />
            ))}
          </div>
        )}
      </div>

      <Footer />
      <Footer />
    </>
  );
}

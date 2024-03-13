import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import LoadSpinner from "../../components/Spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import HarvestCard from "../../components/HarvestCard";

export default function Harvest() {
  const [harvests, setHarvests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/harvest")
      .then((response) => {
        setHarvests(response.data);
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
            to="/harvest/create"
            className="btn btn-warning rounded-pill fw-bold"
          >
            ADD HARVEST
          </Link>
        </div>
        {loading ? (
          <LoadSpinner />
        ) : (
          <div className="row row-cols-1 row-cols-lg-3 g-2">
            {harvests.map((harvest) => (
              <HarvestCard key={harvest._id} harvest={harvest} />
            ))}
          </div>
        )}
      </div>

      <Footer />
      <Footer />
    </>
  );
}

import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import LoadSpinner from "../../components/Spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import SwarmCard from "../../components/SwarmCard";

export default function Swarm() {
  const [swarms, setSwarms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/swarm")
      .then((response) => {
        setSwarms(response.data);
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
            to="/swarm/create"
            className="btn btn-warning rounded-pill fw-bold"
          >
            ADD SWARM
          </Link>
        </div>
        {loading ? (
          <LoadSpinner />
        ) : (
          <div className="row row-cols-1 row-cols-lg-3 g-2">
            {swarms.map((swarm) => (
              <SwarmCard key={swarm._id} swarm={swarm} />
            ))}
          </div>
        )}
      </div>

      <Footer />
      <Footer />
    </>
  );
}

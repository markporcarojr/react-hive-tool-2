import { useEffect, useState, useContext } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import SwarmCard from "../../components/SwarmCard";
import UserContext from "../../context/UserContext";

export default function Swarm() {
  const [swarms, setSwarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/swarm?userId=${user._id}`)
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
            className="btn btn-michgold rounded-pill fw-bold"
          >
            ADD SWARM
          </Link>
        </div>
        {loading ? (
          <LoadSpinner />
        ) : (
          <div className="row row-cols-1 row-cols-lg-3 g-2">
            {swarms.map((swarm) => (
              <SwarmCard key={swarm.userId} swarm={swarm} />
            ))}
          </div>
        )}
      </div>

      <Footer />
      <Footer />
    </>
  );
}

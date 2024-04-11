import { useEffect, useState, useContext } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import FeedCard from "../../components/FeedCard";
import UserContext from "../../context/UserContext";

export default function Feed() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/feed?userId=${user._id}`)
      .then((response) => {
        setFeeds(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Feeding data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <CustomNavbar />
      <div className="p-4">
        <div className="d-flex justify-content-around mb-3">
          <Link
            to="/feed/create"
            className="btn btn-warning rounded-pill fw-bold"
          >
            ADD FEEDING
          </Link>
        </div>
        {loading ? (
          <LoadSpinner />
        ) : (
          <div className="row row-cols-1 row-cols-lg-3 g-2">
            {feeds.map((feed) => (
              <FeedCard key={feed.userId} feed={feed} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

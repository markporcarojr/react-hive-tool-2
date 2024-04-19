// HiveData.jsx
import { useState, useEffect } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import HiveTable from "../../components/HiveTable";
import axios from "axios";
import LoadSpinner from "../../components/Spinner";
import { useParams } from "react-router-dom";

const HiveData = () => {
  const [userInspections, setUserInspections] = useState([]);

  const [loading, setLoading] = useState(false);
  const { hiveId } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/user-data?hiveId=${hiveId}`) // Assuming this is the correct endpoint to fetch inspections
      .then((response) => {
        setUserInspections(response.data.userInspections);
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
      {loading ? (
        <LoadSpinner />
      ) : (
        <HiveTable userInspections={userInspections} />
      )}
      <Footer />
    </>
  );
};

export default HiveData;

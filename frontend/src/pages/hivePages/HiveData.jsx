// HiveData.jsx
import { useState, useEffect } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import HiveTable from "../../components/HiveTable";
import axios from "axios";
import { useParams } from "react-router-dom";

const HiveData = () => {
  const [userInspections, setUserInspections] = useState([]);
  const [userFeeds, setUserFeeds] = useState([]);
  const [userTreatments, setUserTreatments] = useState([]);
  const { hiveId } = useParams();

  useEffect(() => {
    if (hiveId) {
      axios
        .get(`http://localhost:5555/user-data?hiveId=${hiveId}`)
        .then((response) => {
          setUserInspections(response.data.userInspections);
          setUserFeeds(response.data.userFeeds);
          setUserTreatments(response.data.userTreatments);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [hiveId]);

  return (
    <>
      <CustomNavbar />
      <HiveTable
        userInspections={userInspections}
        userFeeds={userFeeds}
        userTreatments={userTreatments}
      />
      <Footer />
    </>
  );
};

export default HiveData;

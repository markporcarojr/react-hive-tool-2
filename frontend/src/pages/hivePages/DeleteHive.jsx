import { useState } from "react";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import { Card, Button } from "react-bootstrap";
import BackButton from "../../components/BackButton";
import { deleteImageFromStorage } from "../../utils/firebaseUtils";

const DeleteHive = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteHive = async () => {
    setLoading(true);
    try {
      // Delete the image from Firebase Storage
      const response = await axios.get(`http://localhost:5555/new-hive/${id}`);
      const hive = response.data;
      // fixed bug, if user has no image
      if (hive.hiveImage) {
        await deleteImageFromStorage(hive.hiveImage);
      }

      // Now delete the hive from your API
      await axios.delete(`http://localhost:5555/new-hive/${id}`);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      alert("An error has occurred. Please Check Console");
      console.log(error);
    }
  };
  return (
    <>
      {loading && <LoadSpinner />}
      <CustomNavbar />
      <Card
        className="rounded-5 border-3 d-flex align-items-center p-5 m-5"
        style={{ borderColor: "#ffcb05" }}
      >
        <h1 className="fs-1 fw-bold my-4 text-white mb-5">Delete Hive</h1>
        {loading ? <LoadSpinner /> : ""}
        <div className="d-flex align-items-center mx-auto text-michgold">
          <h3>Are You Sure You Want To Delete This Hive?</h3>
        </div>
        <div>
          <Button className="btn-danger m-3" onClick={handleDeleteHive}>
            YES
          </Button>
          <BackButton text={"NO"} />
        </div>
      </Card>
      ;
      <Footer />
    </>
  );
};

export default DeleteHive;

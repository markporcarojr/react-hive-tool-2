import axios from "axios";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import CustomNavbar from "../../components/layout/CustomNavbar";
import Footer from "../../components/layout/Footer";
import LoadSpinner from "../../components/Spinner";

const DeleteInventory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteInventory = () => {
    setLoading(true);
    axios
      .delete(`${import.meta.env.VITE_BACKEND_API}/inventory/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/inventory");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error has occurred. Please Check Console");
        console.log(error);
      });
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
          <h3>Are You Sure You Want To Delete This Inventory?</h3>
        </div>
        <div>
          <Button className="btn-danger m-3" onClick={handleDeleteInventory}>
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

export default DeleteInventory;

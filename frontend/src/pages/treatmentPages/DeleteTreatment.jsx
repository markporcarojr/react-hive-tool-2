import React, { useState } from "react";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import { Card, Button } from "react-bootstrap";
import BackButton from "../../components/BackButton";

const DeleteTreatment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteTreatment = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/treatments/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/treatments");
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
        <h1 className="fs-1 fw-bold my-4 text-white mb-5">Delete Treatment</h1>
        {loading ? <LoadSpinner /> : ""}
        <div className="d-flex align-items-center mx-auto text-michgold">
          <h3>Are You Sure You Want To Delete This Treatment?</h3>
        </div>
        <div>
          <Button className="btn-danger m-3" onClick={handleDeleteTreatment}>
            YES
          </Button>
          <BackButton />
        </div>
      </Card>
      ;
      <Footer />
    </>
  );
};

export default DeleteTreatment;

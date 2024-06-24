import React, { useState } from "react";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import { Card, Button } from "react-bootstrap";
import BackButton from "../../components/BackButton";

const DeleteSwarm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteSwarm = () => {
    setLoading(true);
    axios
      .delete(`https://react-hive-tool-backend.onrender.com/swarm/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/swarm");
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
        <h1 className="fs-1 fw-bold my-4 text-white mb-5">Delete Swarm Trap</h1>
        {loading ? <LoadSpinner /> : ""}
        <div className="d-flex align-items-center mx-auto text-michgold">
          <h3>Are You Sure You Want To Delete This Swarm Trap?</h3>
        </div>
        <div>
          <Button className="btn-danger m-3" onClick={handleDeleteSwarm}>
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

export default DeleteSwarm;

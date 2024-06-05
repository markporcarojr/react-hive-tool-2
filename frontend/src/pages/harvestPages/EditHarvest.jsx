import React, { useState, useEffect } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import GenericForm from "../../components/GenericForm";

const EditHarvest = () => {
  const [initialValues, setInitialValues] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/harvest/${id}`)
      .then((res) => {
        setInitialValues({
          harvestAmount: res.data.harvestAmount,
          harvestType: res.data.harvestType,
          harvestDate: res.data.harvestDate,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error fetching data:", error);
        setMessage(error.response.data.message);
      });
  }, [id]);

  const handleEditHarvest = (formData) => {
    setLoading(true);
    axios
      .put(`http://localhost:5555/harvest/${id}`, formData)
      .then(() => {
        setLoading(false);
        navigate("/harvest");
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.response.data.message);
        console.log(error);
      });
  };

  const fields = [
    {
      name: "harvestAmount",
      label: "Harvest Amount",
      type: "number",
    },
    {
      name: "harvestType",
      label: "Harvest Type",
      type: "select",
      options: [
        { value: "Honey", label: "Honey" },
        { value: "Wax", label: "Wax" },
      ],
    },
    {
      name: "harvestDate",
      label: "Date",
      type: "date",
    },
  ];

  return (
    <>
      <CustomNavbar />
      {loading && <LoadSpinner />}
      <Container style={{ maxWidth: "700px" }}>
        <Card className="text-michgold text-center mt-2 mb-5">
          <h1 className="fw-bold m-4">EDIT HARVEST</h1>
          <GenericForm
            fields={fields}
            initialValues={initialValues}
            onSubmit={handleEditHarvest}
            buttonText="UPDATE"
          />
          <p style={{ color: "#ab0a0a", textAlign: "center" }}>{message}</p>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default EditHarvest;

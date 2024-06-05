import { useState, useContext } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import GenericForm from "../../components/GenericForm";

const CreateHarvest = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveHarvest = (formData) => {
    const data = {
      ...formData,
      userId: user._id,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/harvest", data)
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
      label: "Harvest Amount (lbs)",
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
          <h1 className="fw-bold m-4">HARVEST</h1>

          <GenericForm
            fields={fields}
            onSubmit={handleSaveHarvest}
            buttonText="ADD"
          />
          <p style={{ color: "#ab0a0a", textAlign: "center" }}>{message}</p>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default CreateHarvest;

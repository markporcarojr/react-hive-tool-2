import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import UserContext from "../../context/UserContext.jsx";
import { uploadImageToStorage } from "../../utils/firebaseUtils.js";

const CreateSwarm = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setValue("swarmImage", file);
  };

  const handleSaveSwarm = async (data) => {
    setLoading(true);
    setMessage(""); // Clear previous messages

    try {
      let imageUrl = "";
      if (data.swarmImage) {
        imageUrl = await uploadImageToStorage(
          data.swarmImage,
          "images/swarmImages/"
        );
      }
      const formData = {
        ...data,
        userId: user._id,
        swarmImage: imageUrl || null,
      };

      await axios.post("http://localhost:5555/swarm", formData);
      setLoading(false);
      navigate("/swarm");
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <>
      <CustomNavbar />
      {loading ? (
        <LoadSpinner />
      ) : (
        <Container style={{ maxWidth: "700px" }}>
          <Card className="text-michgold text-center mt-2 mb-5">
            {/* Include partial title here */}

            {/* Forms */}
            <h1 className="m-5 fw-bold">NEW SWARM TRAP</h1>

            <Form onSubmit={handleSubmit(handleSaveSwarm)} id="swarm-form">
              <div className="m-3 fs-3 mt-0 fw-semibold">
                <Form.Label htmlFor="swarmNumber">Swarm Number</Form.Label>
                <Form.Control
                  {...register("swarmNumber", { required: true })}
                  type="number"
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  name="swarmNumber"
                  id="swarmNumber"
                  aria-describedby="swarmNumber"
                />
                {errors.swarmNumber && (
                  <p className="text-danger">Swarm Trap Number is required</p>
                )}
              </div>

              <div className="m-3 mt-0 fs-3 fw-semibold">
                <Form.Group className="mb-3" controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    {...register("location", { required: true })}
                    as="textarea"
                    className="bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                    rows={3}
                  />
                  {errors.location && (
                    <p className="text-danger">Location is required</p>
                  )}
                </Form.Group>
              </div>
              <div className="m-3 fs-3 mt-0 fw-semibold">
                <Form.Label htmlFor="swarmImage">Swarm Image</Form.Label>
                <Form.Control
                  type="file"
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="swarmImage"
                  name="swarmImage"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="m-3 fs-3 mt-0 fw-semibold">
                <Form.Label htmlFor="swarmDate">Date</Form.Label>
                <Form.Control
                  {...register("swarmDate", { required: true })}
                  type="date"
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="swarmDate"
                  name="swarmDate"
                />
                {errors.swarmDate && (
                  <p className="text-danger">Date is required</p>
                )}
              </div>
            </Form>
            {/* Form end */}

            <div className="d-flex justify-content-around mb-3">
              <Button
                type="submit"
                form="swarm-form"
                className="btn px-5 btn-michgold fw-bold rounded-pill"
              >
                ADD
              </Button>
            </div>
            <p style={{ color: "#ab0a0a", textAlign: "center" }}>{message}</p>
          </Card>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default CreateSwarm;

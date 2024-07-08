import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import BackButton from "../../components/BackButton.jsx";
import axios from "axios";
import UserContext from "../../context/UserContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import {
  uploadUserImageToStorage,
  deleteImageFromStorage,
} from "../../utils/firebaseUtils.js";

const EditSwarm = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [oldImageURL, setOldImageURL] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/swarm/${id}`)
      .then((res) => {
        setValue("swarmNumber", res.data.swarmNumber);
        setValue("location", res.data.location);
        setValue("swarmDate", res.data.swarmDate);
        setLoading(false);
        setOldImageURL(res.data.swarmImage);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error fetching data:", error);
        setMessage(error.response.data.message);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setValue("swarmImage", file);
  };

  const handleEditSwarm = async (data) => {
    setLoading(true);

    try {
      let imageUrl = oldImageURL; // Initialize imageUrl with the old image URL

      // Check if a new image has been uploaded
      if (data.swarmImage && data.swarmImage instanceof File) {
        // Upload the new image and get its URL
        imageUrl = await uploadUserImageToStorage(data.swarmImage, user._id);
      }

      const formData = {
        ...data,
        userId: user._id,
        swarmImage: imageUrl || null,
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/swarm/${id}`,
        formData
      );
      if (oldImageURL && data.swarmImage instanceof File) {
        // Delete the old image
        await deleteImageFromStorage(oldImageURL);
      }

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
        <Container
          style={{
            maxWidth: "700px",
            border: "3px solid #ffcb05",
            borderRadius: "1em",
          }}
          className="mt-5"
        >
          <Card className="text-michgold  mt-2 mb-5">
            {/* Forms */}
            <div className="mt-3 text-center">
              <BackButton text={"⬅ BACK"} />
            </div>
            <h1 className="m-5 fw-bold text-center">EDIT SWARM TRAP</h1>

            <Form onSubmit={handleSubmit(handleEditSwarm)} id="swarm-form">
              <div className="m-3 fs-3 mt-0 fw-semibold">
                <Form.Label htmlFor="swarmNumber" className="m-3">
                  Swarm Number
                </Form.Label>
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
                  <Form.Label htmlFor="location" className="m-3">
                    Location
                  </Form.Label>
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
                <Form.Label htmlFor="swarmImage" className="m-3">
                  Swarm Image
                </Form.Label>
                <Form.Control
                  type="file"
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="swarmImage"
                  name="swarmImage"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="m-3 fs-3 mt-0 fw-semibold">
                <Form.Label htmlFor="swarmDate" className="m-3">
                  Date
                </Form.Label>
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

            <div className="d-flex justify-content-around mt-5">
              <Button
                type="submit"
                form="swarm-form"
                className="btn px-5 btn-michgold fw-bold rounded-pill"
              >
                UPDATE
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

export default EditSwarm;

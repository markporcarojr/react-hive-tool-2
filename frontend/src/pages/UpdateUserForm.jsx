import { useState, useEffect } from "react";
import axios from "axios";
import CustomNavbar from "../components/CustomNavbar.jsx";
import LoadSpinner from "../components/Spinner.jsx";
import Footer from "../components/Footer.jsx";
import { Container, Button, Col, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  uploadImageToStorage,
  deleteImageFromStorage,
} from "../utils/firebaseUtils.js"; // Import Firebase functions

const UpdateUserForm = () => {
  const [formData, setFormData] = useState({
    apiaryName: "",
    userName: "",
    zipcode: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiaryImage, setApiaryImage] = useState(null);
  const [oldImageURL, setOldImageURL] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5555/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { apiaryName, userName, zipcode, apiaryImage } =
          response.data.user;
        setFormData({ apiaryName, userName, zipcode });
        setOldImageURL(apiaryImage);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching data:", error);
        setMessage(error.response?.data?.message);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setApiaryImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Upload image to Firebase storage
      let imageUrl = apiaryImage
        ? await uploadImageToStorage(apiaryImage, "images/apiaryImages/")
        : null;

      // Update form data with the Firebase storage URL
      const updatedFormData = { ...formData, apiaryImage: imageUrl };

      // Send updated form data to backend
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5555/user/update/${id}`,
        updatedFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (oldImageURL && apiaryImage) {
        // Delete the old image
        await deleteImageFromStorage(oldImageURL);
      }

      setMessage(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Update user error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomNavbar />
      {loading ? (
        <LoadSpinner />
      ) : (
        <Container className="mt-5 text-michgold">
          <h1 className="text-center mb-5">Update User</h1>
          <Form onSubmit={handleSubmit}>
            <Col md={5} className="mx-auto">
              <Form.Group controlId="apiaryName" className="text-michgold mb-4">
                <Form.Control
                  type="text"
                  id="apiaryName"
                  name="apiaryName"
                  placeholder="Enter Your Apiary Name..."
                  value={formData.apiaryName}
                  onChange={handleChange}
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold my-2 white-placeholder"
                />
              </Form.Group>
            </Col>
            <Col md={5} className="mx-auto">
              <Form.Group controlId="userName" className="text-michgold mb-4">
                <Form.Control
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="Enter Your User Name..."
                  value={formData.userName}
                  onChange={handleChange}
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold my-2 white-placeholder"
                />
              </Form.Group>
            </Col>
            <Col md={5} className="mx-auto">
              <Form.Group controlId="zipcode" className="text-michgold mb-4">
                <Form.Control
                  type="number"
                  id="zipcode"
                  name="zipcode"
                  placeholder="Enter Your Zipcode..."
                  value={formData.zipcode}
                  onChange={handleChange}
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold my-2 white-placeholder"
                />
              </Form.Group>
            </Col>
            <Col md={5} className="mx-auto text-center">
              <Form.Group
                controlId="apiaryImage"
                className="text-michgold mb-4"
              >
                <Form.Label>Apiary Image:</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Apiary Image..."
                  id="apiaryImage"
                  name="apiaryImage"
                  onChange={handleImageUpload}
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold my-2 white-placeholder"
                />
              </Form.Group>
            </Col>

            <div className="text-center mt-3">
              <Button
                variant="primary"
                type="submit"
                className="btn-michgold btn-gold rounded-pill px-5 m-3 mb-2 mt-1"
              >
                Update User
              </Button>
            </div>
          </Form>
          {message && <p className="mt-3">{message}</p>}
        </Container>
      )}
      <Footer />
    </>
  );
};

export default UpdateUserForm;

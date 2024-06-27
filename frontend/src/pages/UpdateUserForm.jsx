import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import CustomNavbar from "../components/CustomNavbar.jsx";
import LoadSpinner from "../components/Spinner.jsx";
import Footer from "../components/Footer.jsx";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import UserContext from "../context/UserContext.jsx";
import {
  uploadUserImageToStorage,
  deleteImageFromStorage,
} from "../utils/firebaseUtils.js"; // Import Firebase functions

const UpdateUserForm = () => {
  const [formData, setFormData] = useState({
    apiaryName: "",
    username: "",
    zipcode: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiaryImage, setApiaryImage] = useState(null);
  const [oldImageURL, setOldImageURL] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  //2- create a variable from response with useRef, set to initialize to an empty object
  let oldFormData = useRef({});

  //1- get response for all fields
  //2- create a variable from response
  //3- get all edit form values
  //4- compare all response field values to edit form field
  //5- map over fields in object of response field with edit fields
  //6- patch ** if ** != then submit only

  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        //1- get response for all fields
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { apiaryName, username, zipcode, apiaryImage } =
          response.data.user;

        //2- create a variable from response using useRef
        oldFormData.current = { apiaryName, username, zipcode, apiaryImage };

        //3- get all edit form values and set the state
        setFormData({ apiaryName, username, zipcode });
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

      //4- compare all response field values to edit form field
      // Check which fields have changed if any
      const updatedFields = Object.keys(formData).filter(
        (key) => formData[key] !== oldFormData.current[key]
      );

      // Check if the image has been updated
      const imageUpdated = apiaryImage !== null;

      //5- Iterate over fields in object of response field with edit fields
      if (updatedFields.length > 0 || imageUpdated) {
        // If any fields have changed or the image has been updated, prepare updated data
        const updatedFormData = {};

        updatedFields.forEach((field) => {
          updatedFormData[field] = formData[field];
        });

        if (imageUpdated) {
          // Upload the new image and update the URL
          const imageUrl = await uploadUserImageToStorage(
            apiaryImage,
            user._id
          );
          updatedFormData.apiaryImage = imageUrl;
        }

        const token = localStorage.getItem("token");
        const response = await axios.patch(
          `${import.meta.env.VITE_BACKEND_API}/user/update/${id}`,
          updatedFormData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (oldImageURL && apiaryImage) {
          // Delete the old image
          await deleteImageFromStorage(oldImageURL);
        }

        setMessage(response.data.message);
        navigate("/");
      } else {
        setMessage("No changes detected. Data not submitted.");
      }
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
        <Container
          className="mt-5 text-michgold container bg-michblue p-3 rounded-3"
          style={{ maxWidth: "700px", border: "3px solid #ffcb05" }}
        >
          <h1 className="m-5 fw-bold text-center">UPDATE USER</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="apiaryName" className="text-michgold m-3">
              <Form.Label className="fs-3 m-3 fw-semibold">
                Apiary Name
              </Form.Label>

              <Form.Control
                type="text"
                name="apiaryName"
                placeholder="Enter Your Apiary Name..."
                value={formData.apiaryName}
                onChange={handleChange}
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
              />
            </Form.Group>
            <Form.Group controlId="username" className="text-michgold m-3">
              <Form.Label className="fs-3 m-3 fw-semibold">
                User Name
              </Form.Label>

              <Form.Control
                type="text"
                name="username"
                placeholder="Enter Your User Name..."
                value={formData.username}
                onChange={handleChange}
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
              />
            </Form.Group>
            <Form.Group controlId="zipcode" className="text-michgold m-3">
              <Form.Label className="fs-3 m-3 fw-semibold">Zipcode</Form.Label>

              <Form.Control
                type="number"
                name="zipcode"
                placeholder="Enter Your Zipcode..."
                value={formData.zipcode}
                onChange={handleChange}
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
              />
            </Form.Group>
            <Form.Group controlId="apiaryImage" className="text-michgold m-3">
              <Form.Label className="fs-3 m-3 fw-semibold">
                Apiary Image
              </Form.Label>
              <Form.Control
                type="file"
                placeholder="Apiary Image..."
                name="apiaryImage"
                onChange={handleImageUpload}
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
              />
            </Form.Group>

            <div className="text-center m-5">
              <Button
                variant="primary"
                type="submit"
                className="btn-michgold btn-gold rounded-pill px-5 m-3 mb-2 mt-1"
              >
                UPDATE USER
              </Button>
            </div>
            <div className="text-center m-3">
              <Link to={`/user/delete/${user._id}`}>
                <Button
                  variant="danger"
                  className="rounded-pill px-5 m-3 mb-2 mt-1"
                >
                  DELETE ACCOUNT
                </Button>
              </Link>
            </div>
            {message && (
              <p className="mt-3 text-danger fw-bold text-center">{message}</p>
            )}
          </Form>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default UpdateUserForm;

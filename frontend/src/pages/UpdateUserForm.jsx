import { useState, useContext } from "react";
import UserContext from "../context/UserContext.jsx";
import axios from "axios";
import CustomNavbar from "../components/CustomNavbar.jsx";
import Footer from "../components/Footer.jsx";
import { Container, Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

const UpdateUserForm = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    apiaryName: "",
    userName: "",
    zipcode: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5555/user/update/${user._id}`,
        formData
      );
      setMessage(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Update user error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <CustomNavbar />
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
      <Footer />
    </>
  );
};

export default UpdateUserForm;
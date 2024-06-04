import { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import UserContext from "../context/UserContext.jsx";
import Cookies from "js-cookie";
import axios from "axios";
import CustomNavbar from "../components/CustomNavbar.jsx";
import Footer from "../components/Footer.jsx";
import LoadSpinner from "../components/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import checkPassword from "../utils/checkPassword.js";

import logoWebp1x from "../assets/images/hive_tool@1x.webp";
import logoWebp2x from "../assets/images/hive_tool@2x.webp";
import logoWebp3x from "../assets/images/hive_tool@3x.webp";
import logoPng1x from "../assets/images/hive_tool@1x.png";
import logoPng2x from "../assets/images/hive_tool@2x.png";
import logoPng3x from "../assets/images/hive_tool@3x.png";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    apiaryName: "",
    password: "",
    confirmPassword: "",
    zipcode: "",
  });
  const [message, setMessage] = useState(null);
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const googleAuth = () => {
    window.open("http://localhost:5555/auth/google/callback", "_self");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);

      return;
    }

    const isPasswordValid = checkPassword(formData.password);

    if (!isPasswordValid) {
      setMessage(
        "Password must be at least 8 characters long, contain at least one uppercase letter, and at least one number"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios
        .post("http://localhost:5555/user/register", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          setLoading(false);
          navigate("/");
        });

      const data = response.data;

      if (response.status === 200 && data.user) {
        // const userId = data.user._id;
        // Cookies.set("userCookie", userId);
        setUser(data.user);
      } else {
        console.log(data.error);
        setMessage(data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("An error occurred while processing your request.");
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
        <>
          <Row className="justify-content-center mb-0">
            <div className="d-flex justify-content-center">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${logoWebp1x} 1x, ${logoWebp2x} 2x, ${logoWebp3x} 3x`}
                />
                <img
                  className="ms-3"
                  src={logoPng1x}
                  alt=""
                  srcSet={`${logoPng1x} 1x, ${logoPng2x} 2x, ${logoPng3x} 3x`}
                />
              </picture>
            </div>
          </Row>
          <Container fluid>
            <Row className="justify-content-center">
              <Col md={6} className="text-center">
                <p style={{ color: "#ab0a0a", textAlign: "center" }}>
                  {message}
                </p>
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="email">
                    <Form.Control
                      type="email"
                      autoComplete="off"
                      name={formData.email}
                      value={formData.email}
                      placeholder="Email..."
                      className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="apiaryName">
                    <Form.Control
                      type="text"
                      autoComplete="apiaryName"
                      value={formData.apiaryName}
                      name={formData.apiaryName}
                      placeholder="Apiary Name..."
                      className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold my-2"
                      onChange={(e) =>
                        setFormData({ ...formData, apiaryName: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="zipcode">
                    <Form.Control
                      type="number"
                      autoComplete="zipcode"
                      value={formData.zipcode}
                      name={formData.zipcode}
                      placeholder="Enter Zipcode..."
                      className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold my-2"
                      onChange={(e) =>
                        setFormData({ ...formData, zipcode: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="password"
                    className="position-relative"
                  >
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={formData.password}
                      placeholder="Password..."
                      className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold my-2 white-placeholder"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    {/* Eye icon button */}
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      onClick={() => setShowPassword(!showPassword)}
                      className="eye-icon"
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="confirmPassword"
                    className="position-relative"
                  >
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      placeholder="Confirm Password..."
                      className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold my-2"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEye : faEyeSlash}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="eye-icon"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button
                      type="submit"
                      className="btn-michgold btn-gold rounded-pill px-5 m-3 mb-2 mt-1"
                    >
                      REGISTER
                    </Button>
                    <div>
                      <Button
                        onClick={googleAuth}
                        type="submit"
                        className="btn-michgold btn-gold rounded-pill px-4 m-3 mb-2 mt-1"
                      >
                        <BsGoogle />
                        <span className="ms-3">Register With Google</span>
                      </Button>
                    </div>
                    <a
                      href="/login"
                      className="d-block text-center fs-4 text-michgold"
                    >
                      Already have an account? Login
                    </a>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </>
      )}
      <Footer />
    </>
  );
};

export default Register;

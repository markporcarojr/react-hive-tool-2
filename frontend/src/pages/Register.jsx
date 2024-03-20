import { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import UserContext from "../components/UserContext.jsx";
import Cookies from "js-cookie";
import axios from "axios";
import CustomNavbar from "../components/CustomNavbar.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";

import logoWebp1x from "../assets/images/hive_tool@1x.webp";
import logoWebp2x from "../assets/images/hive_tool@2x.webp";
import logoWebp3x from "../assets/images/hive_tool@3x.webp";
import logoPng1x from "../assets/images/hive_tool@1x.png";
import logoPng2x from "../assets/images/hive_tool@2x.png";
import logoPng3x from "../assets/images/hive_tool@3x.png";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios
        .post("http://localhost:5555/user/register", form, {
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
        const userId = data.user._id;
        Cookies.set("userCookie", userId);
        setUser(data.user);
      } else {
        console.log(data.error);
        setMessage(data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  return (
    <>
      <CustomNavbar />
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
            <p style={{ color: "#ab0a0a", textAlign: "center" }}>{message}</p>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Control
                  type="email"
                  autoComplete="current-email"
                  value={form.email}
                  placeholder="Email..."
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  placeholder="Password..."
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold my-2"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </Form.Group>
              {/* New confirmPassword field for registration */}
              <Form.Group controlId="confirmPassword">
                <Form.Control
                  type="password"
                  autoComplete="current-password"
                  value={form.confirmPassword}
                  placeholder="Confirm Password..."
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold my-2"
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Button
                  type="submit"
                  className="btn-michgold btn-gold rounded-pill px-5 m-3 mb-2 mt-1"
                >
                  REGISTER
                </Button>
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
      <Footer />
    </>
  );
};

export default Register;

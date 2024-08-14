import { useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import logoWebp1x from "../../assets/images/hive_tool@1x.webp";
import logoWebp2x from "../../assets/images/hive_tool@2x.webp";
import logoWebp3x from "../../assets/images/hive_tool@3x.webp";
import logoPng1x from "../../assets/images/hive_tool@1x.png";
import logoPng2x from "../../assets/images/hive_tool@2x.png";
import logoPng3x from "../../assets/images/hive_tool@3x.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/forgot-password`,
        {
          email: email,
        }
      );
      setMessage(response.data.message);
      setEmail("");
      navigate("/login");
    } catch (error) {
      console.error("Password reset error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Container className="mt-5" fluid style={{ maxWidth: "700px" }}>
        <Form onSubmit={handleResetPassword}>
          <Row className="justify-content-center mb-0">
            <div className="d-flex justify-content-center">
              <picture className="rotateY">
                <source
                  type="image/webp"
                  srcSet={`${logoWebp1x} 1x, ${logoWebp2x} 2x, ${logoWebp3x} 3x`}
                />
                <img
                  className="pop"
                  src={logoPng1x}
                  alt=""
                  srcSet={`${logoPng1x} 1x, ${logoPng2x} 2x, ${logoPng3x} 3x`}
                />
              </picture>
            </div>
          </Row>
          <h1 className="text-center mb-3 text-michgold">Forgot Password?</h1>
          <Col md={5} className="mx-auto">
            <Form.Group controlId="email" className="text-michgold mb-4">
              {/* <Form.Label>Email Address</Form.Label> */}
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-center bg-white text-black border-3 border-michgold rounded-4 fw-bold"
              />
            </Form.Group>
          </Col>
          <div className="text-center mt-3">
            <Button
              variant="primary"
              type="submit"
              className="btn-michgold rounded-pill px-5 m-3 mb-2 mt-1"
            >
              Reset Password
            </Button>
          </div>
          <a
            href="/login"
            className="d-block text-center fs-4 text-michgold mt-3"
          >
            Back To Login
          </a>
        </Form>
        {message && <p className="mt-3">{message}</p>}
      </Container>
    </>
  );
};

export default ForgotPassword;

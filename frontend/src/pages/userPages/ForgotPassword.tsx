import { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import CustomNavbar from "../../components/CustomNavbar.tsx";
import Footer from "../../components/Footer.tsx";
import { useNavigate } from "react-router-dom";

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
      <CustomNavbar />
      <Container className="mt-5 text-michgold">
        <h1 className="text-center mb-5">Forgot Password</h1>
        <Form onSubmit={handleResetPassword}>
          <Col md={5} className="mx-auto">
            <Form.Group controlId="email" className="text-michgold mb-4">
              {/* <Form.Label>Email Address</Form.Label> */}
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold my-2 white-placeholder"
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
      <Footer />
    </>
  );
};

export default ForgotPassword;

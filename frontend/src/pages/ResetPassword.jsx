import { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import CustomNavbar from "../components/CustomNavbar.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  //   const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleResetPassword = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5555/auth/reset-password/${id}/${token}`, {
        password,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5 text-michgold">
        <h1 className="text-center mb-5">Reset Password</h1>
        <Form onSubmit={handleResetPassword}>
          <Col md={5} className="mx-auto">
            <Form.Group controlId="password" className="text-michgold mb-4">
              {/* <Form.Label>Email Address</Form.Label> */}
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Update Password
            </Button>
          </div>
          <a
            href="/login"
            className="d-block text-center fs-4 text-michgold mt-3"
          >
            Back To Login
          </a>
        </Form>
        {/* {message && <p className="mt-3">{message}</p>} */}
      </Container>
      <Footer />
    </>
  );
};

export default ResetPassword;

import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CustomNavbar from "../../components/layout/CustomNavbar";
import Footer from "../../components/layout/Footer.jsx";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  //   const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleResetPassword = (e) => {
    e.preventDefault();
    axios
      .post(
        `${
          import.meta.env.VITE_BACKEND_API
        }/auth/reset-password/${id}/${token}`,
        {
          password,
        }
      )
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
              className="btn-michgold rounded-pill px-5 m-3 mb-2 mt-1"
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

import Footer from "../components/Footer.jsx";
import UserContext from "../context/UserContext.jsx";
import CustomNavbar from "../components/CustomNavbar.jsx";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import AuthForm from "../components/AuthForm.jsx";

const Login = () => {
  // const [message, setMessage] = useState(null);
  // const { setUser } = useContext(UserContext);
  // const navigate = useNavigate();

  // const initialData = {
  //   email: "",
  //   password: "",
  // };

  // const handleSubmit = async (form) => {
  //   try {
  //     const response = await axios.post(
  //       "https://react-hive-tool-backend.onrender.com/user/login",
  //       form,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const responseData = response.data;

  //     if (response.status === 200 && responseData.token) {
  //       const { user, token } = responseData;
  //       localStorage.setItem("token", token); // Store JWT token in localStorage
  //       setUser(user);
  //       setMessage(null); // Clear any previous error messages
  //       navigate("/");
  //     } else {
  //       console.log(responseData.error);
  //       setMessage(responseData.message || "An error occurred during login.");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setMessage("An error occurred. Please try again later.");
  //   }
  // };

  // const formFields = [
  //   {
  //     name: "email",
  //     type: "email",
  //     placeholder: "Email...",
  //     autoComplete: "current-email",
  //   },
  //   {
  //     name: "password",
  //     type: "password",
  //     placeholder: "Password...",
  //     autoComplete: "current-password",
  //   },
  // ];

  return (
    <>
      <CustomNavbar />
      <Container id="main-container" className="d-grid h-100 text-michgold">
        <Form id="sign-in-form" className="text-center p-3 w-100">
          {/* <img
            className="mb-4 bootstrap-logo"
            src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
            alt="Bootstrap 5"
          /> */}
          <h1 className="mb-3 fs-3 fw-normal">Please sign in</h1>
          <Form.Group controlId="sign-in-email-address">
            <Form.Control
              type="email"
              size="lg"
              placeholder="Email address"
              autoComplete="username"
              className="position-relative"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="sign-in-password">
            <Form.Control
              type="password"
              size="lg"
              placeholder="Password"
              autoComplete="current-password"
              className="position-relative"
            />
          </Form.Group>
          <Form.Group
            className="d-flex justify-content-center mb-4"
            controlId="remember-me"
          >
            <Form.Check label="Remember me" />
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" size="lg">
              Sign in
            </Button>
          </div>
          <p className="mt-5 ">&copy; 2021-2022</p>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default Login;

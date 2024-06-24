import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar.jsx";
import Footer from "../components/Footer.jsx";
import AuthForm from "../components/AuthForm.jsx";

const Register = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const initialData = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (form) => {
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        "https://react-hive-tool-backend.onrender.com/user/register",
        { email: form.email, password: form.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;

      if (response.status === 201) {
        setMessage("Registration successful. Please log in.");
        navigate("/login");
      } else {
        console.log(responseData.error);
        setMessage(
          responseData.message || "An error occurred during registration."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  const formFields = [
    {
      name: "email",
      type: "email",
      placeholder: "Email...",
      autoComplete: "new-email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password...",
      autoComplete: "new-password",
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password...",
      autoComplete: "new-password",
    },
  ];

  return (
    <>
      <CustomNavbar />
      <AuthForm
        formFields={formFields}
        initialData={initialData}
        onSubmit={handleSubmit}
        message={message}
        buttonText="REGISTER"
        linkText="Already have an account? Log in"
        linkHref="/login"
      />
      <Footer />
    </>
  );
};

export default Register;

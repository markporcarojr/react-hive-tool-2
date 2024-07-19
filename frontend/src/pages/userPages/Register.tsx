import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../../components/CustomNavbar.tsx";
import Footer from "../../components/Footer.tsx";
import AuthForm from "../../components/AuthForm.tsx";

const Register = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const initialData = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  };

  const handleSubmit = async (form) => {
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/register`,
        { email: form.email, password: form.password, username: form.username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;
      if (responseData.message === "User was registered successfully.") {
        setTimeout(() => navigate("/login"), 1000);
      } else {
        console.log("Error:", responseData.error);
        console.log("Data:", responseData);
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
      name: "username",
      type: "text",
      placeholder: "Username...",
      autoComplete: "new-username",
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

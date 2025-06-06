import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/forms/AuthForm.jsx";
import UserContext from "../../context/UserContext.jsx";

const Login = () => {
  const [message, setMessage] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const initialData = {
    email: "",
    password: "",
  };

  const handleSubmit = async (form) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/login`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;

      if (response.status === 200 && responseData.token) {
        const { user, token } = responseData;
        localStorage.setItem("token", token); // Store JWT token in localStorage
        setUser(user);
        setMessage(null); // Clear any previous error messages
        navigate("/");
      } else {
        console.log(responseData.error);
        setMessage(responseData.message || "An error occurred during login.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handleGuestLogin = async () => {
    const guestCredentials = {
      email: "guest@guest",
      password: "guest",
    };
    await handleSubmit(guestCredentials);
  };

  const formFields = [
    {
      name: "email",
      type: "email",
      placeholder: "Email...",
      autoComplete: "current-email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password...",
      autoComplete: "current-password",
    },
  ];

  return (
    <>
      {/* <CustomNavbar /> */}
      <AuthForm
        formFields={formFields}
        initialData={initialData}
        onSubmit={handleSubmit}
        message={message}
        buttonText="LOGIN"
        linkText="Create Account"
        linkHref="/register"
        isLogin={true}
        onGuestLogin={handleGuestLogin}
      />

      {/* <Footer /> */}
    </>
  );
};

export default Login;

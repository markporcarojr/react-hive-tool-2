// AuthContext.js
import React, { createContext, useState } from "react";
import axios from "axios"; // Import Axios
import useAuth from "./useAuth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const { handleSignIn, handleSignOut } = useAuth();

  // Authentication logic using Axios
  const signIn = async (username, password) => {
    try {
      const response = await axios.post("/login", { username, password });
      const { token } = response.data;

      // Set token in localStorage for future requests
      localStorage.setItem("token", token);

      setAuthUser({ username }); // Assuming successful authentication sets authUser
    } catch (error) {
      console.error("Sign-in error:", error);
      // Handle error (e.g., display error message to user)
    }
  };

  const signOut = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");

    // Call handleSignOut from useAuth to sign the user out
    handleSignOut();
    setAuthUser(null); // Clear authUser when signed out
  };

  return (
    <AuthContext.Provider value={{ authUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// AuthContext.js
import { createContext, useState } from "react";
import useAuth from "./useAuth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleSignIn = async (email, password) => {
    try {
      // Make API call to authenticate user and receive JWT token
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Store JWT in localStorage
        setUser(data.user); // Set user in context
        return true;
      } else {
        // Handle login error
        return false;
      }
    } catch (error) {
      console.error("Error signing in:", error);
      return false;
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Remove JWT from localStorage
    setUser(null); // Clear user from context
  };

  return (
    <AuthContext.Provider value={{ user, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

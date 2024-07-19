// useAuth.js
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const useAuth = () => {
  const { authUser, handleSignIn, handleSignOut } = useContext(AuthContext);

  return { authUser, handleSignIn, handleSignOut };
};

export default useAuth;

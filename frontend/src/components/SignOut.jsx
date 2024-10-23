// src/components/SignOut.js
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignOut() {
  const { handleSignOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    handleSignOut();
    navigate("/");
  };

  return (
    <div>
      <a onClick={handleLogout}>Sign Out</a>
    </div>
  );
}

export default SignOut;

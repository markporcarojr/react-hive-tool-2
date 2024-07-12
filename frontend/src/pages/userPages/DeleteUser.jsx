import { useState, useContext } from "react";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import { Card, Button } from "react-bootstrap";
import BackButton from "../../components/BackButton";
import { deleteFolderFromStorage } from "../../utils/firebaseUtils";
import UserContext from "../../context/UserContext";

const DeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleDeleteUser = async () => {
    setLoading(true);

    try {
      // Delete user data from the backend
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/user/delete/${user._id}`
      );
      console.log("User deleted:", response.data);

      // Delete all user images from Firebase Storage
      await deleteFolderFromStorage(`user-images/${user._id}`);

      console.log("All user images deleted from Firebase Storage.");

      setLoading(false);
      logout();
    } catch (error) {
      setLoading(false);
      setMessage("An error has occurred. Please check console for details.");
      console.error("Error deleting user:", error);
      logout();
    }
  };

  return (
    <>
      {loading ? (
        <LoadSpinner />
      ) : (
        <>
          <CustomNavbar />
          <Card
            className="rounded-5 border-3 d-flex align-items-center p-5 m-5"
            style={{ borderColor: "#ffcb05" }}
          >
            <h1 className="fs-1 fw-bold my-4 text-white mb-5">
              Delete Account
            </h1>
            {/* {loading ? <LoadSpinner /> : ""} */}
            <div className="d-flex align-items-center mx-auto text-michgold">
              <h3>Are You Sure You Want To Delete Your Account?</h3>
            </div>
            <div>
              <Button className="btn-danger m-3" onClick={handleDeleteUser}>
                YES
              </Button>
              <BackButton text={"NO"} />
            </div>
            <p className="text-danger">{message}</p>
          </Card>
          ;
          <Footer />
        </>
      )}
    </>
  );
};
export default DeleteUser;

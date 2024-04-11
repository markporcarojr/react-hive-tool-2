import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function PrivateRoutes() {
  const { user } = useContext(UserContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
}

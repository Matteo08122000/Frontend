import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

const Auth = () => {
  return localStorage.getItem("Auth");
};

const ProtectedRoutes = () => {
  const isAuthorized = Auth();

  return isAuthorized ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;

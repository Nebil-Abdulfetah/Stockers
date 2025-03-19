import { Navigate } from "react-router-dom";

const RedirectLogin = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" /> : children;
};

export default RedirectLogin;
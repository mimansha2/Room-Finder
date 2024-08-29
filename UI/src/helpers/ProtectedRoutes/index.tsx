import { Navigate } from "react-router-dom";
import AppLayout from "../../Components/Layout";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoutes = () => {
  const { user } = useAuth();

  return user ? <AppLayout /> : <Navigate to="/Homepage" replace />;
};

export default ProtectedRoutes;

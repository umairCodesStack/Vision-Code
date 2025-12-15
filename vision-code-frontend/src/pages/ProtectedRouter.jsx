import { Navigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuth";

function ProtectedRouter({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return isAuthenticated ? children : null;
}

export default ProtectedRouter;

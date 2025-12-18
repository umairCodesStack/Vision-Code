import { Navigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuth";
import { decodeToken, getTokenData } from "../utils/tokenUtils";
import { useState, useEffect } from "react";

function ProtectedRouter({ studentDashboard, InstructorDashboard }) {
  const { isAuthenticated } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/users/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        return data.role;
      } catch (error) {
        console.error("Error fetching user role:", error);
        return null;
      }
    };

    const loadUserRole = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const { userId } = getTokenData(token);
        if (!userId) {
          setError("No user ID found in token");
          setLoading(false);
          return;
        }

        const role = await fetchUserRole(userId);
        setUserRole(role);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserRole();
  }, [isAuthenticated]); // Only re-run when authentication changes

  // Show loading state
  if (loading) {
    return <div>Loading user role...</div>;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Show error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If role is still null after loading
  if (userRole === null) {
    return <div>Unable to determine user role</div>;
  }
  console.log("User role:", userRole);
  // Render based on role
  return userRole === "instructor" ? InstructorDashboard : studentDashboard;
}

export default ProtectedRouter;

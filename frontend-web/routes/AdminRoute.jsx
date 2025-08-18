import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

export default function AdminRoute({ children }) {
  const { currentUser, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (!currentUser) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!isAdmin) return <Navigate to="/403" replace />;
  return children;
}

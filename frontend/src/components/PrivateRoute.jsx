import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function PrivateRoute({ children }) {
  const { usuario, cargando } = useAuth();
  if (cargando) return <div className="spinner" />;
  if (!usuario) return <Navigate to="/login" replace />;
  return children;
}

export function AdminRoute({ children }) {
  const { usuario, cargando } = useAuth();
  if (cargando) return <div className="spinner" />;
  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.rol !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}

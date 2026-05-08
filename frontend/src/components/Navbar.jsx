import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <img src="/logo.png" alt="ECOBOL Logo" className={styles.logo} />
        <span>ECOBOL</span>
      </div>
      <div className={styles.links}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/envios"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Envíos
        </NavLink>
        {usuario?.rol === "admin" && (
          <>
            <NavLink
              to="/sucursales"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Sucursales
            </NavLink>
            <NavLink
              to="/usuarios"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Usuarios
            </NavLink>
          </>
        )}
      </div>
      <div className={styles.user}>
        <span className={styles.userInfo}>
          <strong>{usuario?.nombre}</strong>
          <small>{usuario?.rol}</small>
        </span>
        <button className="btn btn-outline btn-sm" onClick={handleLogout}>
          Salir
        </button>
      </div>
    </nav>
  );
}

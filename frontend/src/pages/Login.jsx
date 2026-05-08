import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/AuthContext";
import styles from "./Login.module.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setCargando(true);
    setError("");
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (e) {
      setError(e.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src="/logo.png" alt="Logo ECOBOL" className={styles.logo} />
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="usuario@ecobol.bo"
              {...register("email", { required: "El email es requerido" })}
            />
            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
            />
            {errors.password && (
              <span className="form-error">{errors.password.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={cargando}
          >
            {cargando ? "Ingresando..." : "Ingresar al Sistema"}
          </button>
        </form>

        <div className={styles.footer}>
          <Link to="/rastrear">Rastrear un paquete →</Link>
        </div>
      </div>
    </div>
  );
}

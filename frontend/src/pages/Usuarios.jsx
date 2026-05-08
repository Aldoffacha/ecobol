import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const cargar = () => {
    api
      .get("/usuarios")
      .then((r) => setUsuarios(r.data))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = async (data) => {
    setError("");
    try {
      await api.post("/usuarios", data);
      reset();
      setMostrarForm(false);
      setExito("Usuario creado correctamente");
      cargar();
      setTimeout(() => setExito(""), 3000);
    } catch (e) {
      setError(e.response?.data?.error || "Error al crear el usuario");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Gestión de Usuarios</h1>
        <button
          className="btn btn-primary"
          onClick={() => setMostrarForm(!mostrarForm)}
        >
          {mostrarForm ? "Cancelar" : "+ Nuevo Usuario"}
        </button>
      </div>

      {exito && <div className="alert alert-success">{exito}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {mostrarForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16 }}>Nuevo Usuario</h3>
          <form onSubmit={handleSubmit(guardar)}>
            <div className="grid-2">
              <div className="form-group">
                <label>Nombre completo *</label>
                <input {...register("nombre", { required: "Requerido" })} />
                {errors.nombre && (
                  <span className="form-error">{errors.nombre.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  {...register("email", { required: "Requerido" })}
                  placeholder="usuario@ecobol.bo"
                />
                {errors.email && (
                  <span className="form-error">{errors.email.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Contraseña *</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Requerido",
                    minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  })}
                />
                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Rol *</label>
                <select {...register("rol", { required: "Requerido" })}>
                  <option value="">Seleccionar...</option>
                  <option value="empleado">Empleado</option>
                  <option value="admin">Administrador</option>
                </select>
                {errors.rol && (
                  <span className="form-error">{errors.rol.message}</span>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Crear Usuario
            </button>
          </form>
        </div>
      )}

      <div className="card">
        {cargando ? (
          <div className="spinner" />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Registrado</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id_usuario}>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.rol === "admin" ? "badge-destino" : "badge-registrado"
                      }`}
                      style={{ textTransform: "capitalize" }}
                    >
                      {u.rol}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                    {new Date(u.created_at).toLocaleDateString("es-BO")}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        u.activo ? "badge-entregado" : "badge-retrasado"
                      }`}
                    >
                      {u.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

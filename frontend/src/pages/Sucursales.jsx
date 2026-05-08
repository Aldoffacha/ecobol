import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";

export default function Sucursales() {
  const [sucursales, setSucursales] = useState([]);
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
      .get("/sucursales")
      .then((r) => setSucursales(r.data))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = async (data) => {
    setError("");
    try {
      await api.post("/sucursales", data);
      reset();
      setMostrarForm(false);
      setExito("Sucursal creada correctamente");
      cargar();
      setTimeout(() => setExito(""), 3000);
    } catch (e) {
      setError(e.response?.data?.error || "Error al crear la sucursal");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Gestión de Sucursales</h1>
        <button
          className="btn btn-primary"
          onClick={() => setMostrarForm(!mostrarForm)}
        >
          {mostrarForm ? "Cancelar" : "+ Nueva Sucursal"}
        </button>
      </div>

      {exito && <div className="alert alert-success">{exito}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {mostrarForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16 }}>Nueva Sucursal</h3>
          <form onSubmit={handleSubmit(guardar)}>
            <div className="grid-2">
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  {...register("nombre", { required: "Requerido" })}
                  placeholder="Ej: Sucursal La Paz Norte"
                />
                {errors.nombre && (
                  <span className="form-error">{errors.nombre.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Ciudad *</label>
                <input
                  {...register("ciudad", { required: "Requerido" })}
                  placeholder="Ej: La Paz"
                />
                {errors.ciudad && (
                  <span className="form-error">{errors.ciudad.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Dirección *</label>
                <input {...register("direccion", { required: "Requerido" })} />
                {errors.direccion && (
                  <span className="form-error">{errors.direccion.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input {...register("telefono")} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Guardar Sucursal
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
                <th>#</th>
                <th>Nombre</th>
                <th>Ciudad</th>
                <th>Dirección</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {sucursales.map((s) => (
                <tr key={s.id_sucursal}>
                  <td>{s.id_sucursal}</td>
                  <td>{s.nombre}</td>
                  <td>{s.ciudad}</td>
                  <td>{s.direccion}</td>
                  <td>{s.telefono || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

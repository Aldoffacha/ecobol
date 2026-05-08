import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../services/api";

export default function NuevoEnvio() {
  const navigate = useNavigate();
  const [sucursales, setSucursales] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    api.get("/sucursales").then((r) => setSucursales(r.data));
  }, []);

  const onSubmit = async (data) => {
    setCargando(true);
    setError("");
    try {
      const res = await api.post("/envios", data);
      navigate(`/envios/${res.data.id_envio}`);
    } catch (e) {
      setError(e.response?.data?.error || "Error al registrar el envío");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Registrar Nuevo Envío</h1>
        <Link to="/envios" className="btn btn-outline">
          ← Volver
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid-2" style={{ gap: 24 }}>
          {/* Remitente */}
          <div className="card">
            <h3 style={{ marginBottom: 16, color: "#1a56db" }}>
              Datos del Remitente
            </h3>
            <div className="form-group">
              <label>Nombre completo *</label>
              <input
                {...register("remitente_nombre", { required: "Requerido" })}
              />
              {errors.remitente_nombre && (
                <span className="form-error">
                  {errors.remitente_nombre.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                {...register("remitente_telefono")}
                placeholder="7XXXXXXX"
              />
            </div>
            <div className="form-group">
              <label>Dirección</label>
              <input {...register("remitente_direccion")} />
            </div>
          </div>

          {/* Destinatario */}
          <div className="card">
            <h3 style={{ marginBottom: 16, color: "#1a56db" }}>
              Datos del Destinatario
            </h3>
            <div className="form-group">
              <label>Nombre completo *</label>
              <input
                {...register("destinatario_nombre", { required: "Requerido" })}
              />
              {errors.destinatario_nombre && (
                <span className="form-error">
                  {errors.destinatario_nombre.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                {...register("destinatario_telefono")}
                placeholder="7XXXXXXX"
              />
            </div>
            <div className="form-group">
              <label>Dirección</label>
              <input {...register("destinatario_direccion")} />
            </div>
          </div>
        </div>

        {/* Detalles del envío */}
        <div className="card" style={{ marginTop: 24 }}>
          <h3 style={{ marginBottom: 16, color: "#1a56db" }}>
            Detalles del Envío
          </h3>
          <div className="grid-3">
            <div className="form-group">
              <label>Sucursal de Origen *</label>
              <select
                {...register("id_sucursal_origen", { required: "Requerido" })}
              >
                <option value="">Seleccionar...</option>
                {sucursales.map((s) => (
                  <option key={s.id_sucursal} value={s.id_sucursal}>
                    {s.ciudad} - {s.nombre}
                  </option>
                ))}
              </select>
              {errors.id_sucursal_origen && (
                <span className="form-error">
                  {errors.id_sucursal_origen.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Sucursal de Destino *</label>
              <select
                {...register("id_sucursal_destino", { required: "Requerido" })}
              >
                <option value="">Seleccionar...</option>
                {sucursales.map((s) => (
                  <option key={s.id_sucursal} value={s.id_sucursal}>
                    {s.ciudad} - {s.nombre}
                  </option>
                ))}
              </select>
              {errors.id_sucursal_destino && (
                <span className="form-error">
                  {errors.id_sucursal_destino.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Tipo de Servicio *</label>
              <select {...register("tipo_servicio", { required: "Requerido" })}>
                <option value="">Seleccionar...</option>
                <option value="normal">Normal (7 días)</option>
                <option value="express">Express (2 días)</option>
                <option value="certificado">Certificado (5 días)</option>
              </select>
              {errors.tipo_servicio && (
                <span className="form-error">
                  {errors.tipo_servicio.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Peso (kg) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                {...register("peso", {
                  required: "Requerido",
                  min: { value: 0.01, message: "Debe ser mayor a 0" },
                })}
              />
              {errors.peso && (
                <span className="form-error">{errors.peso.message}</span>
              )}
            </div>
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label>Descripción del contenido</label>
              <input
                {...register("descripcion")}
                placeholder="Ej: Documentos legales, ropa, libros..."
              />
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 12,
            justifyContent: "flex-end",
          }}
        >
          <Link to="/envios" className="btn btn-outline">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary" disabled={cargando}>
            {cargando ? "Registrando..." : "Registrar Envío"}
          </button>
        </div>
      </form>
    </div>
  );
}

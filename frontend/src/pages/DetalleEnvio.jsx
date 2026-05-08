import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";

export default function DetalleEnvio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [envio, setEnvio] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [actualizando, setActualizando] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const cargar = () => {
    Promise.all([
      api.get(`/envios/${id}`),
      api.get(`/envios/${id}/historial`),
      api.get("/estados"),
    ])
      .then(([e, h, est]) => {
        setEnvio(e.data);
        setHistorial(h.data);
        setEstados(est.data);
      })
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargar();
  }, [id]);

  const actualizarEstado = async (data) => {
    setActualizando(true);
    setError("");
    try {
      await api.put(`/envios/${id}/estado`, data);
      reset();
      cargar();
    } catch (e) {
      setError(e.response?.data?.error || "Error al actualizar");
    } finally {
      setActualizando(false);
    }
  };

  if (cargando) return <div className="spinner" />;
  if (!envio) return <div>Envío no encontrado</div>;

  const estadoActual = envio.id_estado;
  const estadosSiguientes = estados.filter(
    (e) => e.orden > estadoActual || e.id_estado === estadoActual
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Detalle del Envío</h1>
          <code style={{ fontSize: "1rem", color: "#1a56db" }}>
            {envio.codigo_rastreo}
          </code>
        </div>
        <Link to="/envios" className="btn btn-outline">
          ← Volver
        </Link>
      </div>

      <div className="grid-2" style={{ gap: 24, marginBottom: 24 }}>
        <div className="card">
          <h3
            style={{
              marginBottom: 12,
              fontSize: "0.9rem",
              color: "#6b7280",
              textTransform: "uppercase",
            }}
          >
            Información del Envío
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Estado actual:
              </span>
              <StatusBadge estado={envio.estado_nombre} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Tipo de servicio:
              </span>
              <span style={{ textTransform: "capitalize", fontWeight: 500 }}>
                {envio.tipo_servicio}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Peso:
              </span>
              <span>{envio.peso} kg</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Origen:
              </span>
              <span>
                {envio.sucursal_origen} ({envio.ciudad_origen})
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Destino:
              </span>
              <span>
                {envio.sucursal_destino} ({envio.ciudad_destino})
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Fecha estimada:
              </span>
              <span>
                {envio.fecha_estimada_entrega
                  ? new Date(envio.fecha_estimada_entrega).toLocaleDateString(
                      "es-BO"
                    )
                  : "-"}
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                fontSize: "0.875rem",
              }}
            >
              <div>
                <div style={{ color: "#6b7280", marginBottom: 2 }}>
                  Remitente
                </div>
                <div style={{ fontWeight: 500 }}>{envio.remitente_nombre}</div>
                {envio.remitente_telefono && (
                  <div style={{ color: "#6b7280" }}>
                    {envio.remitente_telefono}
                  </div>
                )}
              </div>
              <div>
                <div style={{ color: "#6b7280", marginBottom: 2 }}>
                  Destinatario
                </div>
                <div style={{ fontWeight: 500 }}>
                  {envio.destinatario_nombre}
                </div>
                {envio.destinatario_telefono && (
                  <div style={{ color: "#6b7280" }}>
                    {envio.destinatario_telefono}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actualizar estado */}
        {estadoActual !== 4 && (
          <div className="card">
            <h3
              style={{
                marginBottom: 12,
                fontSize: "0.9rem",
                color: "#6b7280",
                textTransform: "uppercase",
              }}
            >
              Actualizar Estado
            </h3>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit(actualizarEstado)}>
              <div className="form-group">
                <label>Nuevo Estado *</label>
                <select
                  {...register("id_estado", {
                    required: "Seleccione un estado",
                  })}
                >
                  <option value="">Seleccionar...</option>
                  {estadosSiguientes
                    .filter((e) => e.id_estado !== estadoActual)
                    .map((e) => (
                      <option key={e.id_estado} value={e.id_estado}>
                        {e.nombre}
                      </option>
                    ))}
                </select>
                {errors.id_estado && (
                  <span className="form-error">{errors.id_estado.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Observación</label>
                <input
                  {...register("observacion")}
                  placeholder="Ej: Paquete recibido en bodega central..."
                />
              </div>
              <button
                type="submit"
                className="btn btn-success"
                disabled={actualizando}
              >
                {actualizando
                  ? "Actualizando..."
                  : "Confirmar Cambio de Estado"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Historial */}
      <div className="card">
        <h3
          style={{
            marginBottom: 16,
            fontSize: "0.9rem",
            color: "#6b7280",
            textTransform: "uppercase",
          }}
        >
          Historial de Estados
        </h3>
        {historial.length === 0 ? (
          <div className="empty-state">Sin historial aún</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Estado</th>
                <th>Fecha y Hora</th>
                <th>Usuario</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((h) => (
                <tr key={h.id_historial}>
                  <td>
                    <StatusBadge estado={h.estado_nombre} />
                  </td>
                  <td>{new Date(h.fecha_hora).toLocaleString("es-BO")}</td>
                  <td>{h.usuario_nombre || "-"}</td>
                  <td>{h.observacion || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";
import styles from "./TrackingPublico.module.css";

export default function TrackingPublico() {
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const buscar = async ({ codigo }) => {
    setCargando(true);
    setError("");
    setResultado(null);
    try {
      const { data } = await api.get(
        `/envios/rastrear/${codigo.trim().toUpperCase()}`
      );
      setResultado(data);
    } catch (e) {
      setError(e.response?.data?.error || "No se encontró el envío");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span></span>
        <h1>ECOBOL</h1>
        <p>Rastreo de Envíos</p>
        <Link to="/login" className={styles.loginLink}>
          Acceso empleados →
        </Link>
      </div>

      <div className={styles.searchBox}>
        <form onSubmit={handleSubmit(buscar)} className={styles.form}>
          <input
            type="text"
            placeholder="Ej: ECO-20260501-00001"
            className={styles.input}
            {...register("codigo", {
              required: "Ingrese un código de rastreo",
            })}
          />
          <button type="submit" className="btn btn-primary" disabled={cargando}>
            {cargando ? "Buscando..." : "Rastrear"}
          </button>
        </form>
        {errors.codigo && (
          <span className="form-error">{errors.codigo.message}</span>
        )}
      </div>

      {error && (
        <div
          className="alert alert-error"
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          {error}
        </div>
      )}

      {resultado && (
        <div className={styles.resultado}>
          <div className="card">
            <div className={styles.resultHeader}>
              <div>
                <code style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                  {resultado.codigo_rastreo}
                </code>
                <StatusBadge estado={resultado.estado_nombre} />
              </div>
              <div className={styles.servicio}>
                {resultado.tipo_servicio.toUpperCase()}
              </div>
            </div>

            <div className="grid-2" style={{ marginTop: 20 }}>
              <div>
                <strong>Remitente</strong>
                <p>{resultado.remitente_nombre}</p>
                <small>
                  {resultado.sucursal_origen} — {resultado.ciudad_origen}
                </small>
              </div>
              <div>
                <strong>Destinatario</strong>
                <p>{resultado.destinatario_nombre}</p>
                <small>
                  {resultado.sucursal_destino} — {resultado.ciudad_destino}
                </small>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <strong>Historial de estados</strong>
              <div className={styles.timeline}>
                {resultado.historial.map((h, i) => (
                  <div key={h.id_historial} className={styles.timelineItem}>
                    <div
                      className={`${styles.dot} ${
                        i === resultado.historial.length - 1
                          ? styles.dotActive
                          : ""
                      }`}
                    />
                    <div>
                      <StatusBadge estado={h.estado_nombre} />
                      <span className={styles.fecha}>
                        {new Date(h.fecha_hora).toLocaleString("es-BO")}
                      </span>
                      {h.observacion && (
                        <p className={styles.obs}>{h.observacion}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

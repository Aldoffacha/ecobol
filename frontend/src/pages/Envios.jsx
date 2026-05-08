import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";

export default function Envios() {
  const [envios, setEnvios] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtros, setFiltros] = useState({
    sucursal: "",
    estado: "",
    desde: "",
    hasta: "",
  });

  const cargar = () => {
    setCargando(true);
    const params = new URLSearchParams();
    if (filtros.sucursal) params.append("sucursal", filtros.sucursal);
    if (filtros.estado) params.append("estado", filtros.estado);
    if (filtros.desde) params.append("desde", filtros.desde);
    if (filtros.hasta) params.append("hasta", filtros.hasta);
    api
      .get(`/envios?${params}`)
      .then((r) => setEnvios(r.data))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    Promise.all([api.get("/sucursales"), api.get("/estados")]).then(
      ([s, e]) => {
        setSucursales(s.data);
        setEstados(e.data);
      }
    );
  }, []);

  useEffect(() => {
    cargar();
  }, [filtros]);

  const exportarCSV = async () => {
    const params = new URLSearchParams(
      Object.fromEntries(Object.entries(filtros).filter(([, v]) => v))
    );
    try {
      const response = await api.get(`/reportes?${params}`, {
        responseType: "blob",
      });
      const contentDisposition = response.headers["content-disposition"];
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : "ecobol_reporte.csv";
      const blob = new Blob([response.data], {
        type: "text/csv;charset=utf-8;",
      });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error exportando CSV:", error);
      alert("No se pudo descargar el CSV. Por favor inicia sesión de nuevo.");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Gestión de Envíos</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline" onClick={exportarCSV}>
            ⬇ Exportar CSV
          </button>
          <Link to="/envios/nuevo" className="btn btn-primary">
            + Nuevo Envío
          </Link>
        </div>
      </div>

      {/* Filtros */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="grid-4">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Sucursal</label>
            <select
              value={filtros.sucursal}
              onChange={(e) =>
                setFiltros((f) => ({ ...f, sucursal: e.target.value }))
              }
            >
              <option value="">Todas</option>
              {sucursales.map((s) => (
                <option key={s.id_sucursal} value={s.id_sucursal}>
                  {s.ciudad}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Estado</label>
            <select
              value={filtros.estado}
              onChange={(e) =>
                setFiltros((f) => ({ ...f, estado: e.target.value }))
              }
            >
              <option value="">Todos</option>
              {estados.map((e) => (
                <option key={e.id_estado} value={e.id_estado}>
                  {e.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Desde</label>
            <input
              type="date"
              value={filtros.desde}
              onChange={(e) =>
                setFiltros((f) => ({ ...f, desde: e.target.value }))
              }
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Hasta</label>
            <input
              type="date"
              value={filtros.hasta}
              onChange={(e) =>
                setFiltros((f) => ({ ...f, hasta: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      <div className="card">
        {cargando ? (
          <div className="spinner" />
        ) : (
          <>
            <p
              style={{
                color: "#6b7280",
                fontSize: "0.875rem",
                marginBottom: 12,
              }}
            >
              {envios.length} envío(s) encontrado(s)
            </p>
            {envios.length === 0 ? (
              <div className="empty-state">
                No hay envíos con los filtros seleccionados
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Código Rastreo</th>
                    <th>Remitente</th>
                    <th>Destinatario</th>
                    <th>Origen → Destino</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {envios.map((e) => (
                    <tr key={e.id_envio}>
                      <td>
                        <code style={{ fontSize: "0.8rem" }}>
                          {e.codigo_rastreo}
                        </code>
                      </td>
                      <td>{e.remitente_nombre}</td>
                      <td>{e.destinatario_nombre}</td>
                      <td style={{ fontSize: "0.8rem" }}>
                        {e.ciudad_origen} → {e.ciudad_destino}
                      </td>
                      <td>
                        <span style={{ textTransform: "capitalize" }}>
                          {e.tipo_servicio}
                        </span>
                      </td>
                      <td>
                        <StatusBadge estado={e.estado_nombre} />
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                        {new Date(e.fecha_registro).toLocaleDateString("es-BO")}
                      </td>
                      <td>
                        <Link
                          to={`/envios/${e.id_envio}`}
                          className="btn btn-outline btn-sm"
                        >
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}

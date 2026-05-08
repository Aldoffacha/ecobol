import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import api from "../services/api";

const COLORES = ["#1a56db", "#f59e0b", "#0e9f6e", "#10b981", "#e02424"];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((r) => setStats(r.data))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <div className="spinner" />;

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard Gerencial</h1>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#1a56db" }}>
            {stats.total_envios}
          </div>
          <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            Total Envíos
          </div>
        </div>
        {stats.por_estado.map((e, i) => (
          <div className="card" key={e.estado} style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "2rem", fontWeight: 800, color: COLORES[i] }}
            >
              {e.cantidad}
            </div>
            <div style={{ color: "#6b7280", fontSize: "0.8rem" }}>
              {e.estado}
            </div>
          </div>
        ))}
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#e02424" }}>
            {stats.retrasados}
          </div>
          <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            Retrasados
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Gráfico por estado */}
        <div className="card">
          <h3
            style={{ marginBottom: 16, fontSize: "0.95rem", fontWeight: 600 }}
          >
            Envíos por Estado
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.por_estado}
                dataKey="cantidad"
                nameKey="estado"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ estado, percent }) =>
                  `${estado} ${(percent * 100).toFixed(0)}%`
                }
              >
                {stats.por_estado.map((_, i) => (
                  <Cell key={i} fill={COLORES[i % COLORES.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico por sucursal */}
        <div className="card">
          <h3
            style={{ marginBottom: 16, fontSize: "0.95rem", fontWeight: 600 }}
          >
            Envíos por Sucursal
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.por_sucursal} margin={{ left: -20 }}>
              <XAxis dataKey="ciudad" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar
                dataKey="total_envios"
                fill="#1a56db"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

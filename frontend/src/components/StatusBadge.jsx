const CLASES = {
  Registrado: "badge-registrado",
  "En tránsito": "badge-transito",
  "En sucursal de destino": "badge-destino",
  Entregado: "badge-entregado",
};

export default function StatusBadge({ estado }) {
  const cls = CLASES[estado] || "badge-registrado";
  return <span className={`badge ${cls}`}>{estado}</span>;
}

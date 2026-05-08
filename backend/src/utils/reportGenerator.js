const { Parser } = require("json2csv");

function generarCSV(envios) {
  const campos = [
    { label: "Código Rastreo", value: "codigo_rastreo" },
    { label: "Remitente", value: "remitente_nombre" },
    { label: "Destinatario", value: "destinatario_nombre" },
    { label: "Peso (kg)", value: "peso" },
    { label: "Tipo Servicio", value: "tipo_servicio" },
    { label: "Sucursal Origen", value: "sucursal_origen" },
    { label: "Sucursal Destino", value: "sucursal_destino" },
    { label: "Estado", value: "estado_nombre" },
    { label: "Fecha Registro", value: "fecha_registro" },
    { label: "Fecha Estimada", value: "fecha_estimada_entrega" },
  ];
  const parser = new Parser({ fields: campos });
  return parser.parse(envios);
}

module.exports = { generarCSV };

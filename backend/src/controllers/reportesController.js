const Envio = require("../models/Envio");
const { generarCSV } = require("../utils/reportGenerator");

async function exportar(req, res, next) {
  try {
    const { sucursal, estado, desde, hasta } = req.query;
    const envios = await Envio.findAll({
      id_sucursal: sucursal || null,
      id_estado: estado || null,
      desde: desde || null,
      hasta: hasta || null,
    });
    const csv = generarCSV(envios);
    const fecha = new Date().toISOString().slice(0, 10);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="ecobol_reporte_${fecha}.csv"`
    );
    res.send(csv);
  } catch (err) {
    next(err);
  }
}

module.exports = { exportar };

const pool = require("../../config/db");

async function estadisticas(req, res, next) {
  try {
    const [porEstado, porSucursal, retrasados, totales] = await Promise.all([
      pool.query(`
        SELECT e.nombre AS estado, COUNT(*) AS cantidad
        FROM envios env JOIN estados e ON env.id_estado = e.id_estado
        GROUP BY e.nombre, e.orden ORDER BY e.orden
      `),
      pool.query(`
        SELECT s.ciudad, s.nombre AS sucursal, COUNT(*) AS total_envios
        FROM envios env JOIN sucursales s ON env.id_sucursal_origen = s.id_sucursal
        GROUP BY s.id_sucursal, s.ciudad, s.nombre ORDER BY total_envios DESC
      `),
      pool.query(`
        SELECT COUNT(*) AS retrasados
        FROM envios
        WHERE id_estado != 4
          AND fecha_estimada_entrega < CURRENT_DATE
      `),
      pool.query("SELECT COUNT(*) AS total FROM envios"),
    ]);

    res.json({
      total_envios: Number(totales.rows[0].total),
      retrasados: Number(retrasados.rows[0].retrasados),
      por_estado: porEstado.rows,
      por_sucursal: porSucursal.rows,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { estadisticas };

const pool = require("../../config/db");

async function findByEnvio(id_envio) {
  const { rows } = await pool.query(
    `SELECT h.*, e.nombre AS estado_nombre, u.nombre AS usuario_nombre
     FROM historial_estados h
     JOIN estados e ON h.id_estado = e.id_estado
     LEFT JOIN usuarios u ON h.id_usuario = u.id_usuario
     WHERE h.id_envio = $1
     ORDER BY h.fecha_hora ASC`,
    [id_envio]
  );
  return rows;
}

async function create({ id_envio, id_estado, id_usuario, observacion }) {
  const { rows } = await pool.query(
    "INSERT INTO historial_estados (id_envio, id_estado, id_usuario, observacion) VALUES ($1,$2,$3,$4) RETURNING *",
    [id_envio, id_estado, id_usuario, observacion]
  );
  return rows[0];
}

module.exports = { findByEnvio, create };

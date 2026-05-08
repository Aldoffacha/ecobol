const pool = require("../../config/db");

async function findAll() {
  const { rows } = await pool.query("SELECT * FROM sucursales ORDER BY ciudad");
  return rows;
}

async function create({ nombre, ciudad, direccion, telefono }) {
  const { rows } = await pool.query(
    "INSERT INTO sucursales (nombre, ciudad, direccion, telefono) VALUES ($1, $2, $3, $4) RETURNING *",
    [nombre, ciudad, direccion, telefono]
  );
  return rows[0];
}

module.exports = { findAll, create };

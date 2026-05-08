const pool = require("../../config/db");

async function findAll() {
  const { rows } = await pool.query("SELECT * FROM estados ORDER BY orden");
  return rows;
}

module.exports = { findAll };

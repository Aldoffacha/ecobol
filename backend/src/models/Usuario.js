const pool = require("../../config/db");

async function findByEmail(email) {
  const { rows } = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1 AND activo = TRUE",
    [email]
  );
  return rows[0];
}

async function findAll() {
  const { rows } = await pool.query(
    "SELECT id_usuario, nombre, email, rol, activo, created_at FROM usuarios ORDER BY created_at DESC"
  );
  return rows;
}

async function create({ nombre, email, passwordHash, rol }) {
  const { rows } = await pool.query(
    "INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES ($1, $2, $3, $4) RETURNING id_usuario, nombre, email, rol",
    [nombre, email, passwordHash, rol]
  );
  return rows[0];
}

module.exports = { findByEmail, findAll, create };

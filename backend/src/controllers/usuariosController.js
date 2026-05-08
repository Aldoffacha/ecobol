const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { ROLES } = require("../utils/constants");

async function listar(req, res, next) {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
}

async function crear(req, res, next) {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    if (![ROLES.ADMIN, ROLES.EMPLEADO].includes(rol)) {
      return res.status(400).json({ error: "Rol inválido" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const nuevo = await Usuario.create({ nombre, email, passwordHash, rol });
    res.status(201).json(nuevo);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "El email ya está registrado" });
    }
    next(err);
  }
}

module.exports = { listar, crear };

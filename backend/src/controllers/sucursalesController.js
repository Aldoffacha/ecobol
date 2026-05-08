const Sucursal = require("../models/Sucursal");

async function listar(req, res, next) {
  try {
    const sucursales = await Sucursal.findAll();
    res.json(sucursales);
  } catch (err) {
    next(err);
  }
}

async function crear(req, res, next) {
  try {
    const { nombre, ciudad, direccion, telefono } = req.body;
    if (!nombre || !ciudad || !direccion) {
      return res
        .status(400)
        .json({ error: "Nombre, ciudad y dirección son requeridos" });
    }
    const nueva = await Sucursal.create({
      nombre,
      ciudad,
      direccion,
      telefono,
    });
    res.status(201).json(nueva);
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, crear };

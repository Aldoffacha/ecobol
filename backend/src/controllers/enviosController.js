const Envio = require("../models/Envio");
const HistorialEstado = require("../models/HistorialEstado");
const { generarCodigoRastreo } = require("../utils/trackingCode");
const { ESTADOS, TIPOS_SERVICIO } = require("../utils/constants");

async function listar(req, res, next) {
  try {
    const { sucursal, estado, desde, hasta } = req.query;
    const envios = await Envio.findAll({
      id_sucursal: sucursal || null,
      id_estado: estado || null,
      desde: desde || null,
      hasta: hasta || null,
    });
    res.json(envios);
  } catch (err) {
    next(err);
  }
}

async function rastrear(req, res, next) {
  try {
    const envio = await Envio.findByCodigo(req.params.codigo.toUpperCase());
    if (!envio)
      return res.status(404).json({ error: "Código de rastreo no encontrado" });
    const historial = await HistorialEstado.findByEnvio(envio.id_envio);
    res.json({ ...envio, historial });
  } catch (err) {
    next(err);
  }
}

async function detalle(req, res, next) {
  try {
    const envio = await Envio.findById(req.params.id);
    if (!envio) return res.status(404).json({ error: "Envío no encontrado" });
    res.json(envio);
  } catch (err) {
    next(err);
  }
}

async function crear(req, res, next) {
  try {
    const {
      remitente_nombre,
      remitente_telefono,
      remitente_direccion,
      destinatario_nombre,
      destinatario_telefono,
      destinatario_direccion,
      peso,
      tipo_servicio,
      descripcion,
      id_sucursal_origen,
      id_sucursal_destino,
    } = req.body;

    if (
      !remitente_nombre ||
      !destinatario_nombre ||
      !peso ||
      !tipo_servicio ||
      !id_sucursal_origen ||
      !id_sucursal_destino
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    if (!TIPOS_SERVICIO.includes(tipo_servicio)) {
      return res.status(400).json({ error: "Tipo de servicio inválido" });
    }
    if (Number(peso) <= 0) {
      return res.status(400).json({ error: "El peso debe ser mayor a 0" });
    }

    const codigo_rastreo = generarCodigoRastreo();
    const diasEntrega =
      tipo_servicio === "express" ? 2 : tipo_servicio === "certificado" ? 5 : 7;
    const fecha_estimada = new Date();
    fecha_estimada.setDate(fecha_estimada.getDate() + diasEntrega);

    const nuevo = await Envio.create({
      codigo_rastreo,
      remitente_nombre,
      remitente_telefono,
      remitente_direccion,
      destinatario_nombre,
      destinatario_telefono,
      destinatario_direccion,
      peso,
      tipo_servicio,
      descripcion,
      id_sucursal_origen,
      id_sucursal_destino,
      id_estado: ESTADOS.REGISTRADO,
      fecha_estimada_entrega: fecha_estimada.toISOString().slice(0, 10),
      id_usuario_registro: req.usuario.id_usuario,
    });

    await HistorialEstado.create({
      id_envio: nuevo.id_envio,
      id_estado: ESTADOS.REGISTRADO,
      id_usuario: req.usuario.id_usuario,
      observacion: "Paquete registrado en el sistema",
    });

    const envioCompleto = await Envio.findById(nuevo.id_envio);
    res.status(201).json(envioCompleto);
  } catch (err) {
    next(err);
  }
}

async function actualizarEstado(req, res, next) {
  try {
    const { id_estado, observacion } = req.body;
    if (!id_estado)
      return res.status(400).json({ error: "id_estado es requerido" });

    const envio = await Envio.findById(req.params.id);
    if (!envio) return res.status(404).json({ error: "Envío no encontrado" });

    await Envio.updateEstado(envio.id_envio, id_estado);
    await HistorialEstado.create({
      id_envio: envio.id_envio,
      id_estado,
      id_usuario: req.usuario.id_usuario,
      observacion: observacion || null,
    });

    const actualizado = await Envio.findById(envio.id_envio);
    res.json(actualizado);
  } catch (err) {
    next(err);
  }
}

async function historial(req, res, next) {
  try {
    const envio = await Envio.findById(req.params.id);
    if (!envio) return res.status(404).json({ error: "Envío no encontrado" });
    const h = await HistorialEstado.findByEnvio(envio.id_envio);
    res.json(h);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listar,
  rastrear,
  detalle,
  crear,
  actualizarEstado,
  historial,
};

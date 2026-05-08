const pool = require("../../config/db");

const SELECT_ENVIO = `
  SELECT e.*,
    so.nombre AS sucursal_origen, so.ciudad AS ciudad_origen,
    sd.nombre AS sucursal_destino, sd.ciudad AS ciudad_destino,
    est.nombre AS estado_nombre,
    u.nombre AS usuario_registro
  FROM envios e
  JOIN sucursales so ON e.id_sucursal_origen = so.id_sucursal
  JOIN sucursales sd ON e.id_sucursal_destino = sd.id_sucursal
  JOIN estados est ON e.id_estado = est.id_estado
  LEFT JOIN usuarios u ON e.id_usuario_registro = u.id_usuario
`;

async function findAll({ id_sucursal, id_estado, desde, hasta } = {}) {
  const condiciones = [];
  const params = [];
  let i = 1;
  if (id_sucursal) {
    condiciones.push(
      `(e.id_sucursal_origen = $${i} OR e.id_sucursal_destino = $${i})`
    );
    params.push(id_sucursal);
    i++;
  }
  if (id_estado) {
    condiciones.push(`e.id_estado = $${i}`);
    params.push(id_estado);
    i++;
  }
  if (desde) {
    condiciones.push(`e.fecha_registro >= $${i}`);
    params.push(desde);
    i++;
  }
  if (hasta) {
    condiciones.push(`e.fecha_registro <= $${i}`);
    params.push(hasta);
    i++;
  }
  const where = condiciones.length ? "WHERE " + condiciones.join(" AND ") : "";
  const { rows } = await pool.query(
    `${SELECT_ENVIO} ${where} ORDER BY e.fecha_registro DESC`,
    params
  );
  return rows;
}

async function findByCodigo(codigo_rastreo) {
  const { rows } = await pool.query(
    `${SELECT_ENVIO} WHERE e.codigo_rastreo = $1`,
    [codigo_rastreo]
  );
  return rows[0];
}

async function findById(id) {
  const { rows } = await pool.query(`${SELECT_ENVIO} WHERE e.id_envio = $1`, [
    id,
  ]);
  return rows[0];
}

async function create(datos) {
  const {
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
    id_estado,
    fecha_estimada_entrega,
    id_usuario_registro,
  } = datos;
  const { rows } = await pool.query(
    `INSERT INTO envios (
      codigo_rastreo, remitente_nombre, remitente_telefono, remitente_direccion,
      destinatario_nombre, destinatario_telefono, destinatario_direccion,
      peso, tipo_servicio, descripcion,
      id_sucursal_origen, id_sucursal_destino, id_estado, fecha_estimada_entrega, id_usuario_registro
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING id_envio`,
    [
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
      id_estado,
      fecha_estimada_entrega,
      id_usuario_registro,
    ]
  );
  return rows[0];
}

async function updateEstado(id_envio, id_estado) {
  const extra = id_estado === 4 ? ", fecha_entrega_real = NOW()" : "";
  await pool.query(
    `UPDATE envios SET id_estado = $1${extra} WHERE id_envio = $2`,
    [id_estado, id_envio]
  );
}

module.exports = { findAll, findByCodigo, findById, create, updateEstado };

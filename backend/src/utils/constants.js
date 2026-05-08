const ESTADOS = {
  REGISTRADO: 1,
  EN_TRANSITO: 2,
  EN_SUCURSAL_DESTINO: 3,
  ENTREGADO: 4,
};

const ROLES = {
  ADMIN: "admin",
  EMPLEADO: "empleado",
};

const TIPOS_SERVICIO = ["normal", "express", "certificado"];

module.exports = { ESTADOS, ROLES, TIPOS_SERVICIO };

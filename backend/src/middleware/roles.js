const { ROLES } = require("../utils/constants");

function requireAdmin(req, res, next) {
  if (req.usuario?.rol !== ROLES.ADMIN) {
    return res
      .status(403)
      .json({ error: "Acceso restringido a administradores" });
  }
  next();
}

module.exports = { requireAdmin };

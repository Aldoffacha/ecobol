// Middleware centralizado de manejo de errores
// Refactorización: elimina try/catch duplicado en cada route
function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);
  const status = err.status || 500;
  res
    .status(status)
    .json({ error: err.message || "Error interno del servidor" });
}

module.exports = { errorHandler };

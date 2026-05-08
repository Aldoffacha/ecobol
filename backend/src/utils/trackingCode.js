function generarCodigoRastreo() {
  const ahora = new Date();
  const fecha = ahora.toISOString().slice(0, 10).replace(/-/g, "");
  const aleatorio = String(Math.floor(Math.random() * 99999)).padStart(5, "0");
  return `ECO-${fecha}-${aleatorio}`;
}

module.exports = { generarCodigoRastreo };

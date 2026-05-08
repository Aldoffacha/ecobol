const router = require("express").Router();
const ctrl = require("../controllers/enviosController");
const { verifyToken } = require("../middleware/auth");

// Ruta pública de rastreo
router.get("/rastrear/:codigo", ctrl.rastrear);

// Rutas protegidas
router.get("/", verifyToken, ctrl.listar);
router.post("/", verifyToken, ctrl.crear);
router.get("/:id", verifyToken, ctrl.detalle);
router.put("/:id/estado", verifyToken, ctrl.actualizarEstado);
router.get("/:id/historial", verifyToken, ctrl.historial);

module.exports = router;

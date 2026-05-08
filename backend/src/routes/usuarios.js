const router = require("express").Router();
const { listar, crear } = require("../controllers/usuariosController");
const { verifyToken } = require("../middleware/auth");
const { requireAdmin } = require("../middleware/roles");

router.get("/", verifyToken, requireAdmin, listar);
router.post("/", verifyToken, requireAdmin, crear);

module.exports = router;

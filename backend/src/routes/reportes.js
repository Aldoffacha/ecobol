const router = require("express").Router();
const { exportar } = require("../controllers/reportesController");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, exportar);

module.exports = router;

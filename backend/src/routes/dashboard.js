const router = require("express").Router();
const { estadisticas } = require("../controllers/dashboardController");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, estadisticas);

module.exports = router;

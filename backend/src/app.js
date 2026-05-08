require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/envios", require("./routes/envios"));
app.use("/api/sucursales", require("./routes/sucursales"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/reportes", require("./routes/reportes"));

app.get(
  "/api/estados",
  require("./middleware/auth").verifyToken,
  async (req, res, next) => {
    try {
      const Estado = require("./models/Estado");
      res.json(await Estado.findAll());
    } catch (err) {
      next(err);
    }
  }
);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`ECOBOL API corriendo en http://localhost:${PORT}`)
);

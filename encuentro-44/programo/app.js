const express = require("express");
const app = express();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // limita cada IP a 100 solicitudes por ventanas
});

app.use(helmet());

app.use(limiter);

app.disable("x-powered-by");

app.get("/usuarios", (req, res) => {
  res.send("una lista de usuarios");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
});

app.use(limiter);

app.get("/hola", (req, res) => {
  res.send("Hola!!!!");
});

app.listen(3000, () => {
  console.log("Server corriendo en puerto 3000");
});

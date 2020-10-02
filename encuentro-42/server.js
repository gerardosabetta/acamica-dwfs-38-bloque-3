const express = require("express");
const server = express();

const hobbies = ["Programar", "Entrenar", "Jugar"];

const caracteristicas = {
  name: "Gerardo",
  age: 24,
  height: 172,
};

const logger = (req, res, next) => {
  console.log(`Log: Method ${req.method} - path ${req.path}`);
  next();
};

server.use(logger);

server.get("/hobbies", (req, res) => {
  res.send(hobbies);
});

const validarSiEstaAutorizado = (req, res, next) => {
  if (req.query.api_key === "gera") {
    console.log("Es gera, puede hacer la request!");
    next();
  } else {
    console.log("Un usuario quiso acceder a una ruta protegida y no era gera");
    res.status(401);
    res.send("Unathorized");
  }
};

server.get("/caracteristicas", logger, validarSiEstaAutorizado, (req, res) => {
  res.send(caracteristicas);
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

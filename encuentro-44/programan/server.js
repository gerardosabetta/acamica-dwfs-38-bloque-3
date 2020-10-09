const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
});

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(cors());

const users = [
  {
    nombre: "martin",
    apellido: "soengas",
    edad: 24,
    email: "martin@martin.com",
    password: "1234",
  },
  {
    nombre: "gera",
    apellido: "sabetta",
    edad: 24,
    email: "gera@gera.com",
    password: "1234",
  },
  {
    nombre: "agustin",
    apellido: "fiorini",
    edad: 24,
    email: "agustin@agustin.com",
    password: "1234",
  },
];

server.post("/login", limit, (req, res) => {
  const user = users.find((user) => {
    return user.email === req.body.email && user.password === req.body.password;
  });
  if (user) {
    res.status(200);
    res.json(user);
  } else {
    res.status(401);
    res.send("Usuario o password incorrecto");
  }
});

server.post("/register", (req, res) => {
  users.push({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad,
    email: req.body.email,
    password: req.body.password,
  });

  res.status(200);
  res.json(`El usuario: ${req.body.nombre}, ha sido creado.`);
});

server.listen(3000, () => {
  console.log("App running on port 3000");
});

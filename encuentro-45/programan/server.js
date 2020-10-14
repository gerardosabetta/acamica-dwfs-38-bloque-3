const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");

const secreto = "jkdlhfjk2h34jk12h34jkdhsafj2384hajkhsd";

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
    isAdmin: true,
  },
  {
    nombre: "gera",
    apellido: "sabetta",
    edad: 24,
    email: "gera@gera.com",
    password: "1234",
    isAdmin: false,
  },
  {
    nombre: "agustin",
    apellido: "fiorini",
    edad: 24,
    email: "agustin@agustin.com",
    password: "1234",
    isAdmin: false,
  },
];

const userAuth = (req, res, next) => {
  const headerAuth = req.headers.authorization;

  if (headerAuth) {
    const token = headerAuth.split(" ")[1];
    try {
      const verifyToken = jwt.verify(token, secreto);
      req.authorizationInfo = verifyToken;
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      res.send();
    }
  } else {
    res.status(403);
    res.send("Header authorization not found");
  }
};

server.post("/login", limit, (req, res) => {
  const user = users.find((user) => {
    return user.email === req.body.email && user.password === req.body.password;
  });
  if (user) {
    const jwtUser = jwt.sign(user, secreto);
    res.status(200);
    res.json(jwtUser);
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

server.get("/saludar", userAuth, (req, res) => {
  if (req.authorizationInfo.isAdmin === true) {
    res.send(`Hola ${req.authorizationInfo.nombre}, sos administrador!`);
  } else {
    res.send(`Hola ${req.authorizationInfo.nombre} `);
  }
});

server.listen(3000, () => {
  console.log("App running on port 3000");
});

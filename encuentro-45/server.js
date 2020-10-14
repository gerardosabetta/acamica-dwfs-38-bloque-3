const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

const secreto = "simple";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const noticias = [{ id: 1, titulo: "Se confirma el fin del mundo en el 2021" }];
const usuario = {
  username: "gera",
  firstName: "Gerardo",
  lastName: "Sabetta",
  email: "sabettagerardo@gmail.com",
  password: "1234",
};

const requerirLogin = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    //falsyness & truthyness
    const token = authorizationHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, secreto);
      res.send(decodedToken);
    } catch (e) {
      res.status(403);
      res.send("Error de auth!");
    }

    next();
  } else {
    res.status(403);
    res.send("Forbidden: No autorizado");
  }
};

app.get("/noticias", requerirLogin, (req, res) => {
  res.json(noticias);
});

app.post("/login", (req, res) => {
  if (
    req.body.username === usuario.username &&
    req.body.password === usuario.password
  ) {
    const usuarioARetornar = Object.assign({}, usuario);
    usuarioARetornar.password = undefined;
    const token = jwt.sign(usuarioARetornar, secreto);
    res.send(token);
  } else {
    res.status(401);
    res.send("Tus datos de incio de sesion no son correctos");
  }
});

app.listen(3000, () => {
  console.log("App corriendo en puerto 3000");
});

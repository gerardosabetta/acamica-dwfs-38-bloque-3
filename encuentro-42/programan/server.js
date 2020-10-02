const express = require("express");
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const autores = [
  {
    id: 1,
    nombre: "Jorgue Luis",
    apellido: "Borges",
    fechaDeNacimiento: "24/08/1899",
    libros: [
      {
        id: 1,
        titulo: "Ficciones",
        description: "blablabal",
        anioDePublicacion: 1944,
      },
      {
        id: 2,
        titulo: "El aleph",
        description: "aleph aleph aleph",
        anioDePublicacion: 1949,
      },
    ],
  },
  {
    id: 2,
    nombre: "JK",
    apellido: "Rowling",
    fechaDeNacimiento: "24/08/1980",
    libros: [
      {
        id: 1,
        titulo: "harry potter 1",
        description: "blablabal",
        anioDePublicacion: 2000,
      },
      {
        id: 2,
        titulo: "harry potter 2",
        description: "aleph aleph aleph",
        anioDePublicacion: 2002,
      },
    ],
  },
];

const validarQueIdSeaNumerico = (req, res, next) => {
  if (!isNaN(parseInt(req.params.id))) {
    next();
  } else {
    res.send("Error de id");
  }
};

server.get("/autores", (req, res) => {
  res.json(autores);
});

server.post("/autores", (req, res) => {
  const autor = {
    id: new Date().getTime(),
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fechaDeNacimiento: req.body.fechaDeNacimiento,
    libros: [],
  };

  autores.push(autor);

  res.status(201);
  res.json(autor);
});

server.get("/autores/:id", validarQueIdSeaNumerico, (req, res) => {
  const authorFound = autores.find((autor) => {
    return autor.id === parseInt(req.params.id);
  });
  res.json(authorFound);
});

server.delete("/autores/:id", (req, res) => {
  let get_autor = parseInt(req.params.id);
  let idAutorDelete = autores.findIndex((autor) => {
    return autor.id === get_autor;
  });

  console.log(idAutorDelete);

  if (idAutorDelete != -1) {
    autores.splice(idAutorDelete, 1);
    res.status(204);
    res.send();
  } else {
    res.status(404);
    res.send("Autor no encontrado!");
  }
});

server.put("/autores/:id", validarQueIdSeaNumerico, (req, res) => {
  var id = parseInt(req.params.id);
  const { nombre, apellido, fechaDeNacimiento } = req.body; // desesctructuracion de objeto, consulta la grabacion de la clase 42;
  // const nombre = req.body.nombre;
  // const apellido = req.body.apellido;
  // const fechaDeNacimiento = req.body.fechaDeNacimiento;

  const autorAModificar = autores.find((autor) => {
    return autor.id === id;
  });

  if (nombre !== undefined) {
    autorAModificar.nombre = nombre;
  }

  if (apellido !== undefined) {
    autorAModificar.apellido = apellido;
  }

  if (fechaDeNacimiento !== undefined) {
    autorAModificar.fechaDeNacimiento = fechaDeNacimiento;
  }

  res.json(autorAModificar);
});

server.listen(3000, () => {
  console.log("Listening on 3000");
});

const express = require("express");
const db = require("./db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
  console.log("App running on port 3000");
});

async function createArtist(req) {
  await db.sequelize.query(
    "INSERT INTO bandas (`nombre`, `integrantes`, `fecha_inicio`, `fecha_separacion`, `pais`) VALUES (:nombre, :integrantes, :fecha_inicio, :fecha_separacion, :pais )",
    {
      replacements: {
        nombre: req.body.nombre,
        integrantes: req.body.integrantes,
        fecha_inicio: req.body.fecha_inicio,
        fecha_separacion: req.body.fecha_separacion,
        pais: req.body.pais,
      },
      type: db.sequelize.QueryTypes.INSERT,
    }
  );
}

app.post("/artista", async (req, res) => {
  try {
    await createArtist(req);
    res.send("Artist created successful");
    res.status(201);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500);
    res.send("Something went wrong");
  }
});

async function updateBand(id, nuevaBanda) {
  await db.sequelize.query(
    "UPDATE bandas SET nombre = :nombre, integrantes = :integrantes, fecha_inicio = :fecha_inicio, fecha_separacion = :fecha_separacion, pais = :pais WHERE banda_id = :id",
    {
      replacements: {
        id: id,
        nombre: nuevaBanda.nombre,
        integrantes: nuevaBanda.integrantes,
        fecha_inicio: nuevaBanda.fecha_inicio,
        fecha_separacion: nuevaBanda.fecha_separacion,
        pais: nuevaBanda.pais,
      },
      type: db.sequelize.QueryTypes.UPDATE,
    }
  );
}

app.put("/artista/:id", (req, res) => {
  const bandaId = req.params.id;
  const nuevaBanda = {
    nombre: req.body.nombre,
    integrantes: req.body.integrantes,
    fecha_inicio: req.body.fecha_inicio,
    fecha_separacion: req.body.fecha_separacion,
    pais: req.body.pais,
  };

  try {
    updateBand(bandaId, nuevaBanda);
    res.status(201);
    res.send("Banda modificada");
  } catch (error) {
    res.status(500);
    res.send("Algo salio mal..");
  }
});

async function deleteArtist(id) {
  await db.sequelize.query("DELETE FROM bandas WHERE banda_id = :id", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.DELETE,
  });
}

app.delete("/artista/:id", (req, res) => {
  const artistaId = req.params.id;
  try {
    deleteArtist(artistaId);
    res.send("Artista Borrado correctamente");
  } catch (error) {
    console.log("Algo salio mal :(", error);
    res.status(500);
    res.send("Server error...");
  }
});

let selectArtist = async (bandaId) => {
  const banda = await db.sequelize.query(
    "SELECT banda_id, nombre AS 'banda_nombre' FROM bandas WHERE banda_id = :bandaId",
    {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: { bandaId: bandaId },
    }
  );

  return banda;
};

let selectAlbumsByBand = async (bandaId) => {
  const albums = await db.sequelize.query(
    "SELECT nombre AS 'album_nombre' FROM albums WHERE banda_id = :bandaId",
    {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: { bandaId: bandaId },
    }
  );

  // console.log(albums);

  return albums;
};

app.get("/artista/:id", async (req, res) => {
  const bandaId = req.params.id;
  try {
    const artista = await selectArtist(bandaId);
    const albums = await selectAlbumsByBand(bandaId);
    res.send({
      artista: artista[0],
      albums: albums,
    });
    res.status(200);
  } catch (error) {
    console.log("Error: ", error);
    res.status(404);
    res.send("Algo anda mal.");
  }
});

let selectAllArtists = async () => {
  const bandas = await db.sequelize.query("SELECT * FROM bandas", {
    type: db.sequelize.QueryTypes.SELECT,
  });
  return bandas;
};

app.get("/artista", async (req, res) => {
  try {
    const bandas = await selectAllArtists();
    res.send(bandas);
    res.status(200);
  } catch (error) {
    console.log("Error: ", error);
    res.status(404);
    res.send("Algo anda mal.");
  }
});

let selectAlbum = async (albumId) => {
  const albums = await db.sequelize.query(
    "SELECT albums.nombre AS album_nombre, bandas.nombre AS banda_nombre FROM albums JOIN bandas ON albums.banda_id = bandas.banda_id WHERE albums.album_id = :albumId",
    {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: { albumId: albumId },
    }
  );
  return albums;
};

let selectCanciones = async (albumId) => {
  const canciones = await db.sequelize.query(
    "SELECT canciones.nombre FROM canciones WHERE canciones.album_id = :albumId",
    {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: { albumId: albumId },
    }
  );
  return canciones;
};

app.get("/albums/:id", async (req, res) => {
  const albumId = req.params.id;
  try {
    const album = await selectAlbum(albumId);
    const cancionesDelAlbum = await selectCanciones(albumId);
    res.send({
      album: album[0],
      canciones_del_album: cancionesDelAlbum,
    });
    res.status(200);
  } catch (error) {
    console.log("Error: ", error);
    res.status(404);
    res.send("Algo anda mal.");
  }
});
/*

Les recomiendo trabajar con async await para evitar los problemas de asincronia.

Lo que sucedio fue que en muchas de las funciones se intentaba hacer un return en el `then` de una funcion
la funcion termina de ejecutarse antes de que el then se produzca

// version rota: 
let selectArtist = (bandaId) => {
  db.sequelize
    .query("SELECT * FROM bandas WHERE banda_id = :bandaId", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: { bandaId: bandaId },
    })
    .then((banda) => {
      return banda;
    });
};


Es dificil de ver este tipo de errores. Trabajar con async await lo hace mas facil de notar (la version que quedo implementada mas arriba es con async await)

sin embargo la version con promesas se puede corregir para que funcione. Lo que hay que hacer es retornar la promesa
Les advierto que queda mas feo y confuso :

let selectArtist = (bandaId) => {
  return db.sequelize
    .query("SELECT * FROM bandas WHERE banda_id = :bandaId", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: { bandaId: bandaId },
    })
    .then((banda) => {
      return banda;
    });
};

si retornamos la promesa funciona como esperamos, si no, la funcion retorna undefined y nunca se nos retorna la banda

*/

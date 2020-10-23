const db = require("./db");

function selectAllSongs() {
  db.sequelize
    .query("SELECT * FROM canciones", {
      type: db.sequelize.QueryTypes.SELECT,
    })
    .then((canciones) => {
      console.log("Consulta ejecutada correctamente");
      console.log("Resultado de la consulta: ", canciones);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}

function selectOneSong(songId) {
  db.sequelize
    .query("SELECT * FROM canciones WHERE cancion_id = :songId;", {
      replacements: { songId: songId },
      type: db.sequelize.QueryTypes.SELECT,
    })
    .then((cancion) => {
      console.log("La cancion es: ", cancion);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

selectOneSong(2);

// selectAllSongs();

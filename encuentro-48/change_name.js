const db = require("./db");

// https://sequelize.org/master/manual/raw-queries.html

function changeName(restaurantId, newName) {
  db.sequelize
    .query("UPDATE restaurant SET NOM_RESTO = :newName WHERE ID_RESTO = :id", {
      type: db.sequelize.QueryTypes.UPDATE,
      replacements: { id: restaurantId, newName: newName },
    })
    .then(() => {
      console.log("Consulta ejecutada exitosamente");
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}

changeName(2, "Cocina Colombiana");

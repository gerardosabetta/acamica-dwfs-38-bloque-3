const db = require("./db");

// https://sequelize.org/master/manual/raw-queries.html

function deleteOne(restaurantId) {
  db.sequelize
    .query("DELETE FROM restaurant WHERE ID_RESTO = :id", {
      type: db.sequelize.QueryTypes.DELETE,
      replacements: { id: restaurantId },
    })
    .then(() => {
      console.log("Consulta ejecutada exitosamente");
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}

deleteOne(1);

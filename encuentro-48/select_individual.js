const db = require("./db");

// https://sequelize.org/master/manual/raw-queries.html

function showRestaurant(restaurantId) {
  db.sequelize
    .query("SELECT * FROM restaurant WHERE ID_RESTO = :id", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: { id: restaurantId },
    })
    .then((restaurant) => {
      console.log("Consulta ejecutada exitosamente");
      console.log("Resultado de la consulta: ", restaurant);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}

showRestaurant(1);

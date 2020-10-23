const db = require("./db");

// https://sequelize.org/master/manual/raw-queries.html

function showAllRestaurants() {
  db.sequelize
    .query("SELECT * FROM restaurant", {
      type: db.sequelize.QueryTypes.SELECT,
    })
    .then((restaurants) => {
      console.log("Consulta ejecutada exitosamente");
      console.log("Resultado de la consulta: ", restaurants);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}

showAllRestaurants();

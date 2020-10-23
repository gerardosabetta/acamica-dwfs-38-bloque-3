const db = require("./db");

// https://sequelize.org/master/manual/raw-queries.html

function insertInfo() {
  db.sequelize
    .query("insert into restaurant VALUES (2, ?)", {
      replacements: ["cocina italiana"],
      type: db.sequelize.QueryTypes.INSERT,
    })
    .then(() => {
      console.log("Consulta ejecutada exitosamente");
    })
    .catch(() => {
      console.log("error");
    });
}

insertInfo();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "mysql://root@192.168.64.2:3306/music_database"
);

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};

module.exports = db;

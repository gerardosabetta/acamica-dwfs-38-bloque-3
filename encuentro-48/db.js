const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root@192.168.64.2:3306/resto");

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};

module.exports = db;

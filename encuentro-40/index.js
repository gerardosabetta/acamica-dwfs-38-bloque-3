require("dotenv").config();

const moment = require("moment");

console.log(moment());

console.log(process.env.DB_PASSWORD);

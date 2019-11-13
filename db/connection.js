const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/tgives", {
  logging: false
});

/*
  DO NOT TOUCH THIS FILE
*/

module.exports = { db };

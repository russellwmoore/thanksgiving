const Sequlize = require("sequelize");
const { db } = require("../connection");

const Dish = db.define("dish", {
  name: {
    type: Sequlize.STRING,
    allowNull: false,
    isEmpty: false,
    unique: true
  },
  description: {
    type: Sequlize.TEXT,
    defaultValue: "A Tasty thanksgiving treat"
  }
});

module.exports = { Dish };

const Sequlize = require("sequelize");
const { db } = require("../connection");

const Person = db.define("person", {
  name: {
    type: Sequlize.STRING,
    allowNull: false,
    isEmpty: false
  },
  isAttending: {
    type: Sequlize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = { Person };

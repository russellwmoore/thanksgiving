const { db } = require("./connection");
const { Dish } = require("./models/dish");
const { Person } = require("./models/person");

// Create your associations here!

module.exports = {
  db,
  Dish,
  Person
};

const { db } = require("./connection");
const { Dish } = require("./models/dish");
const { Person } = require("./models/person");

Person.hasOne(Dish);
Dish.belongsTo(Person);

module.exports = {
  db,
  Dish,
  Person
};

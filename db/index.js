const { db } = require('./connection');
const { Dish } = require('./models/Dish');
const { Person } = require('./models/Person');

// Create your associations here!

module.exports = {
  db,
  Dish,
  Person,
};

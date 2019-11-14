const Sequelize = require('sequelize');
const { db } = require('../connection');

const Dish = db.define('dish', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = { Dish };

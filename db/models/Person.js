const Sequelize = require('sequelize');
const { db } = require('../connection');

const Person = db.define('person', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAttending: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = { Person };

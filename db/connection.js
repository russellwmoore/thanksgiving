const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/tgives', {
  logging: false,
});

module.exports = { db };

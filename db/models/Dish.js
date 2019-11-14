const Sequelize = require('sequelize');
const { db } = require('../connection');

const Dish = db.define('dish', {});

module.exports = { Dish };

const Sequelize = require('sequelize');
const { db } = require('../connection');

const Person = db.define('person', {});

module.exports = { Person };

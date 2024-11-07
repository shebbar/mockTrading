const config = require('../config/config');
const Sequelize = require("sequelize");

const dbConfig = config.dbConfig;

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
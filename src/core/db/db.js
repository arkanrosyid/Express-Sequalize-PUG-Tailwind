const { Sequelize } = require('sequelize');
const config = require('../config');

// create sequelize instance

const sequelize = new Sequelize(
    config.DB_NAME, 
    config.DB_USER, 
    config.DB_PASS, {
    host: config.DB_HOST,
    dialect: 'mysql',
    port: config.DB_PORT,
    define: {
      timestamps: false
    }
  });
  
  module.exports = sequelize;
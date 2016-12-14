const mysql = require('mysql');
const extend = require('lodash').assign;
const dbConfig = require('../config/keys/dbConfig');

const config = {
  GCLOUD_PROJECT: process.env.GCLOUD_PROJECT,
  DATA_BACKEND: 'cloudsql',
  MYSQL_USER: dbConfig.MYSQL_USER,
  MYSQL_PASSWORD: dbConfig.MYSQL_PASSWORD,
  MYSQL_HOST: dbConfig.MYSQL_HOST,
};
module.exports = {
  query: (...args) => {
    const db = mysql.createConnection(extend({
      database: 'media_manager',
    }, {
      host: config.MYSQL_HOST,
      user: config.MYSQL_USER,
      password: config.MYSQL_PASSWORD,
    }));
    db.query(...args);
    db.end();
  },
};

const db = require('./dbConfig.js');
const log = require('../config/logging.js');

const dbCallback = (action, callback) =>
  (err, res) => {
    if (err) {
      log.error(`Cannot ${action}`, err);
      callback(err, null);
    } else {
      callback(null, res);
    }
  };

module.exports = {
  insert: (table, data, cb) => {
    const query = 'INSERT INTO ?? SET ?';
    db.query(query, [table, data], dbCallback(`insert into ${table}`, cb));
  },
  // delete requires single parameter where clause - additional filters can be chained with and
  delete: (table, data, cb) => {
    const query = 'DELETE FROM ?? WHERE ?';
    db.query(query, [table, data], dbCallback(`delete from ${table}`, cb));
  },
  // update requires single parameter where clause - additional filters can be chained with and
  update: (table, newData, identifier, cb) => {
    const query = 'UPDATE ?? SET ? WHERE ?';
    db.query(query, [table, newData, identifier], dbCallback(`update ${table}`, cb));
  },
  getSome: (table, cols, params, cb) => {
    const query = 'SELECT ?? FROM ?? WHERE ?';
    db.query(query, [cols, table, params], dbCallback(`get some from ${table}`, cb));
  },
  getAll: (table, cb) => {
    const query = 'SELECT * FROM ??';
    db.query(query, table, dbCallback(`get all from ${table}`, cb));
  },
  query: (...args) => {
    const firstNArgs = args.slice(0, args.length - 1);
    const cb = args.slice(args.length - 1);
    db.query(...firstNArgs, dbCallback('custom query', cb));
  },
};

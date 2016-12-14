const db = require('./dbModel.js');
const log = require('../config/logging.js');

module.exports = {
  getUser: (req, res) => {
    db.getSome('USERS', '*', { userID: req.query.userId }, (err, users) => {
      res.send(err || users[0] || 'user not registered');
    });
  },
  getGroup: (req, res) => {
    db.getSome('GROUPS', '*', { name: req.query.groupName },
      (err, groups) => {
        res.send(err || groups[0] || 'not a group name');
      });
  },
  newUser: (req, res) => {
    db.insert('USERS', req.body, (err, response) => {
      res.send(err || response);
    });
  },
  newGroup: (req, res) => {
    db.insert('GROUPS', req.body, (err, response) => {
      res.send(err || response);
    });
  },
  newAlbum: (req, res) => {
    db.insert('ALBUMS', req.body, (err, response) => {
      res.send(err || response);
    });
  },
  deleteAlbum: (req, res) => {
    db.delete('ALBUMS', { id: req.query.id }, (err, response) => {
      res.send(err || response);
    });
  },
};
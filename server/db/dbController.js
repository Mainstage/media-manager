const db = require('./dbModel.js');

module.exports = {
  getUserAuth: (req, res) => {
    const albumQuery = 'SELECT a.name, a.folder, a.user_id, a.id FROM USERS_ALBUMS ua INNER JOIN ALBUMS a on a.id=ua.album_id WHERE ua.user_id = ?';
    const groupQuery = 'SELECT g.name, g.id FROM USERS_GROUPS ug INNER JOIN GROUPS g on g.id=ug.group_id WHERE ug.user_id = ?';
    db.getSome('USERS', '*', { client_auth_id: req.query.userId }, (uErr, user) => {
      db.query(albumQuery, [user[0].id], (aErr, albums) => {
        db.query(groupQuery, [user[0].id], (gErr, groups) => {
          const result = {
            user: user[0].id,
            albums,
            groups,
          };
          res.send(uErr || aErr || gErr || result || 'user not registered');
        });
      });
      // db.getSome('ALBUMS', '*', { creator_id: user.id }, (err, albums) => {
      //   db.getSome('USER_GROUPS', 'group_id', { user_id: user.id }, (err, groupIds) => {
      //     db.getSome('GROUPS', '*', { group_id: groupIds.id }, (err, groups) => {
      //       const result = {
      //         user: user[0],
      //         albums,
      //         groups,
      //       };
      //       res.send(err || user[0] || 'user not registered');
      //     });
      //   });
      // });
    });
  },
  getUserByName: (req, res) => {
    db.getSome('USERS', '*', { name: req.query.name }, (err, users) => {
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

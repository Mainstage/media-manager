const db = require('./dbModel.js');

module.exports = {
  getUserInfo: (req, res) => {
    const albumQuery = 'SELECT a.name, a.id, a.iconCover FROM USERS_ALBUMS ua INNER JOIN ALBUMS a ON a.id=ua.album_id WHERE ua.user_id = ?';
    const groupQuery = 'SELECT g.name, g.id FROM USERS_GROUPS ug INNER JOIN GROUPS g ON g.id=ug.group_id WHERE ug.user_id = ?';
    db.query(albumQuery, req.query.userId, (aErr, albums) => {
      db.query(groupQuery, req.query.userId, (gErr, groups) => {
        const result = {
          albums,
          groups,
        };
        res.send(aErr || gErr || result || null);
      });
    });
  },
  getUser: (req, res) => {
    db.getSome('USERS', '*', req.query, (err, users) => {
      res.send(err || users[0]);
    });
  },
  getMedia: (req, res) => {
    db.getSome('MEDIA', '*', req.query, (err, media) => {
      console.log('media', media)
      res.send(err || media);
    });
  },
  getGroup: (req, res) => {
    db.getSome('GROUPS', '*', { name: req.query.groupName },
      (err, groups) => {
        res.send(err || groups[0]);
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

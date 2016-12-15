const controller = require('../db/dbController');

module.exports = app => {
  app.post('/login', controller.getUserAuth);
  app.post('/group', controller.newGroup);
  app.post('/user', controller.newUser);
  app.post('/album', controller.newAlbum);
  app.get('/group', controller.getGroup);
};

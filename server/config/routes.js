const controller = require('../db/dbController');

module.exports = (app) => {
  app.get('/users', controller.getUser);
  app.get('/group', controller.getGroup);
  app.get('/userInfo', controller.getUserInfo);

  app.post('/group', controller.newGroup);
  app.post('/user', controller.newUser);
  app.post('/album', controller.newAlbum);
};

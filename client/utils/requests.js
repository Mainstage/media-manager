import axios from 'axios';

const login = clientId =>
  axios.post('/login', clientId);

module.exports = {
  login,
};

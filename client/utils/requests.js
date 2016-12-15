import axios from 'axios';

const getUser = params =>
  axios.get('/users', { params });

module.exports = {
  getUser,
};

import axios from 'axios';

const getUser = params =>
  axios.get('/users', { params });
const getUserInfo = params =>
  axios.get('/userInfo', { params });

module.exports = {
  getUser,
  getUserInfo,
};

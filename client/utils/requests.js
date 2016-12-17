import axios from 'axios';

const getUser = params =>
  axios.get('/users', { params });

const getMedia = params =>
  axios.get('/media', { params });

const getUserInfo = params =>
  axios.get('/userInfo', { params });

const uploadFile = (file, headers) =>
  axios.put('/upload', file, { headers });

module.exports = {
  getUser,
  getUserInfo,
  uploadFile,
  getMedia,
};

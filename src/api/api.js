import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-ativamanager.herokuapp.com/api/v1',
});

api.interceptors.request.use(
  config => {
    config.headers.common = JSON.parse(localStorage.getItem('user'));
    return config;
  },
  error => Promise.reject(error)
);

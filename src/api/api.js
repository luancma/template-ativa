import axios from 'axios';

const localHeadres = localStorage.getItem('user');
const parseHeader = JSON.parse(localHeadres);

export const api = axios.create({
  baseURL:
    'https://api-ativamanager.herokuapp.com/api/v1',
  headers: parseHeader,
});

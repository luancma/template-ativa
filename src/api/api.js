import axios from 'axios';

const headers = localStorage.getItem('user');
const parseHeaders = JSON.parse(headers);
export const api = axios.create({
  baseURL: 'https://api-ativamanager.herokuapp.com/api/v1',
  headers: parseHeaders,
});

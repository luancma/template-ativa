import axios from 'axios';

const localHeadres = localStorage.getItem('user');
const parseHeader = JSON.parse(localHeadres);

export const api = axios.create({
  baseURL:
    'https://private-anon-e13d3b89ab-ativamanagerapi.apiary-mock.com/api/v1',
  headers: parseHeader,
});

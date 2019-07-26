import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://private-anon-e13d3b89ab-ativamanagerapi.apiary-mock.com/api/v1',
});

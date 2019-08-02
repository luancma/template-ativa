import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-ativamanager.herokuapp.com/api/v1',
});

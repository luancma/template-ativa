import axios from 'axios';

const urlApi = 'https://private-anon-e13d3b89ab-ativamanagerapi.apiary-mock.com/api/v1';


// users
export const getUsersRequest = () => axios.get(`${urlApi}/users`);

export const createNewUserRequest = user => axios.post(`${urlApi}/users`, user);

export const fechSingleUser = id => axios.get(`${urlApi}/${id}`);

export const updateSingleUser = (id, email, name) => axios.put(`${urlApi}/${id}`, {name, email});

// states
export const getListOfStates = () => axios.get(`${urlApi}/states`);

// contracts
export const getListOfContracts = () => axios.get(`${urlApi}/contracts`);

export const createNewContract = () => axios.post(`${urlApi}/contracts`, contract);


// customers
export const getListOfCustomers = () => axios.get(`${urlApi}/customers`);

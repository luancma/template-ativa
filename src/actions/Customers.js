import {
  CREATE_NEW_CUSTOMERS,
  RECEIVE_CUSTOMERS,
  RECEIVE_CUSTOMERS_SUCCESS,
} from '../constants/ActionTypes';

export const receiveCustomers = () => ({
  type: RECEIVE_CUSTOMERS,
});

export const createNewCustomer = customer => ({
  type: CREATE_NEW_CUSTOMERS,
  payload: customer,
});

export const receiveCustomersSuccess = customers => ({
  type: RECEIVE_CUSTOMERS_SUCCESS,
  payload: customers,
});

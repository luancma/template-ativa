import {
  RECEIVE_CONTRACTS,
  CREATE_NEW_CONTRACT,
  RECEIVE_CONTRACTS_SUCCESS,
} from '../constants/ActionTypes';

export const receiveContracts = () => ({
  type: RECEIVE_CONTRACTS,
});

export const actionCreateNewContract = contract => ({
  type: CREATE_NEW_CONTRACT,
});

export const actionCreateNewContractSuccess = contract => ({
  type: CREATE_NEW_CONTRACT,
});

export const fetchAllContractsSuccess = contracts => ({
  type: RECEIVE_CONTRACTS_SUCCESS,
  payload: contracts,
});

export const actionCreateContract = contract => ({
  type: CREATE_NEW_CONTRACT,
  payload: contract,
});

import {
  all, fork, put, takeEvery, call
} from 'redux-saga/effects';
import { ContractsApi } from 'api/ContractsApi';
import {
  RECEIVE_CONTRACTS,
  CREATE_NEW_CONTRACT,
  CREATE_NEW_CONTRACT_SUCCESS,
} from 'constants/ActionTypes';

import { fetchAllContractsSuccess } from '../actions/Contracts';

const fetchContractsRequest = () => ContractsApi.getListOfContracts();

const createNewContractRequest = contract => ContractsApi.createNewContract(contract);

function* createNewContract() {
  try {
    const response = yield call(createNewContractRequest);
    if (response.data.contract) {
      const res = response.data.contract;
      yield put(res);
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchContracts() {
  try {
    const response = yield call(fetchContractsRequest);
    if (response.data.contracts) {
      const res = response.data.contracts;
      yield put(fetchAllContractsSuccess(res));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* receiveContracts() {
  yield takeEvery(RECEIVE_CONTRACTS, fetchContracts);
}

export function* createContract() {
  yield takeEvery(CREATE_NEW_CONTRACT, createNewContract);
}

export default function* rootSaga() {
  yield all([fork(receiveContracts)]);
}

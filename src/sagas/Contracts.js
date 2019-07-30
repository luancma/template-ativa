import {
  all, fork, put, takeEvery, call
} from 'redux-saga/effects';
import { ContractsApi } from 'api/ContractsApi';
import { RECEIVE_CONTRACTS } from 'constants/ActionTypes';

import { fetchAllContractsSuccess } from '../actions/Contracts';

const fetchContractsRequest = () => ContractsApi.getListOfContracts();

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

export default function* rootSaga() {
  yield all([fork(receiveContracts)]);
}

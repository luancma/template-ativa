import {
  all, fork, put, takeEvery, call
} from 'redux-saga/effects';
import { CustomersApi } from 'api/CustomersApi';
import { receiveCustomersSuccess } from 'actions/Customers';
import { RECEIVE_CUSTOMERS } from 'constants/ActionTypes';

const receiveCustomersRequest = () => CustomersApi.getListOfCustomers();

function* fetchCustomers() {
  try {
    const response = yield call(receiveCustomersRequest);
    if (response.data.customers) {
      const res = response.data.customers;
      yield put(receiveCustomersSuccess(res));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* receiveCustomers() {
  yield takeEvery(RECEIVE_CUSTOMERS, fetchCustomers);
}

export default function* rootSaga() {
  yield all([fork(receiveCustomers)]);
}

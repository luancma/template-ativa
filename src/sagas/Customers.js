import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { CustomersApi } from 'api/CustomersApi';
import { receiveCustomersSuccess } from 'actions/Customers';
import { RECEIVE_CUSTOMERS, CREATE_NEW_CUSTOMERS } from 'constants/ActionTypes';

const receiveCustomersRequest = () => CustomersApi.getListOfCustomers();

function createNewCustomer(action) {
  console.log(action.payload);
  try {
    console.log('1');
  } catch (error) {
    console.log('2');
  }
}

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

export function* createCustomer() {
  yield takeEvery(CREATE_NEW_CUSTOMERS, createNewCustomer);
}

export default function* rootSaga() {
  yield all([fork(receiveCustomers)]);
}

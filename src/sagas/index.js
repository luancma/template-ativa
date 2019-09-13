import { all } from 'redux-saga/effects';
import authSagas from './Auth';
import userSagas from './User';
import contractSagas from './Contracts';
import customerSagas from './Customers';
import formSagas from './Form';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    userSagas(),
    contractSagas(),
    customerSagas(),
    formSagas(),
  ]);
}

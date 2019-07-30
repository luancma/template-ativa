import { all } from 'redux-saga/effects';
import authSagas from './Auth';
import userSagas from './User';
import contractSagas from './Contracts';

export default function* rootSaga(getState) {
  yield all([authSagas(), userSagas(), contractSagas()]);
}

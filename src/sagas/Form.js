import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import {
  HIDDEN_FORM_ERROR,
  SHOW_FORM_ERROR,
  showMessageError,
} from '../actions/FormCreate';

function testeTrue({ payload }) {
  return console.log('saga true ', payload);
}

function testeFalse({ payload }) {
  return console.log(payload);
}

export function* hiddenErrorSaga() {
  yield takeEvery(HIDDEN_FORM_ERROR, testeTrue);
}

export function* createErrorSaga() {
  yield takeEvery(SHOW_FORM_ERROR, testeFalse);
}

export default function* rootSaga() {
  yield all([fork(createErrorSaga)]);
}

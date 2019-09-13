import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import {
  HIDDEN_FORM_ERROR,
  SHOW_FORM_ERROR,
  showMessageError,
} from '../actions/FormCreate';

function* createError() {
  yield put(showMessageError(true));
}

export function* createErrorSaga() {
  yield takeEvery(SHOW_FORM_ERROR, createError);
}

export default function* rootSaga() {
  yield all([fork(createErrorSaga)]);
}

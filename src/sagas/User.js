import {
  all, fork, put, takeEvery
} from 'redux-saga/effects';


import {
  showAuthMessage
} from 'actions/Auth';
import { CREATE_NEW_USER } from '../constants/ActionTypes';


function* createNewUSer(user) {
  const userObject = user.payload;
  if (userObject.password.trim() !== userObject.confirmPassword) {
    yield put(yield put(showAuthMessage('As senhas devem ser iguais!')));
  } else {
    console.log('CALL ADD_USER');
  }
}


export function* createUser() {
  yield takeEvery(CREATE_NEW_USER, createNewUSer);
}


export default function* rootSaga() {
  yield all([
    fork(createUser),
  ]);
}

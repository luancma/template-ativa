import {
  all, fork, put, takeLatest, takeEvery
} from 'redux-saga/effects';

import {
  SIGNIN_USER,
  SIGNOUT_USER,
} from 'constants/ActionTypes';

import {
  showAuthMessage, userSignInSuccess, userSignOutSuccess
} from 'actions/Auth';

const token = {
  'Content-Type': 'application/json',
  'access-token': 'Z_Z6oHOylJbg5tpve7z6cA',
  uid: 'testeonzop@gmail.com',
  expiry: 1563307215,
  client: 'vOPTEFwB16mHrULrZ65SNQ',
  'token-type': 'Bearer'
};

function* singInUser() {
  try {
    const tokenUser = token;
    if (!tokenUser) {
      yield put(yield put(showAuthMessage('Usuário não encontrado')));
    } else {
      localStorage.setItem('user', JSON.stringify(tokenUser));
      yield put(userSignInSuccess(tokenUser));
    }
  } catch (error) {
    yield put(yield put(showAuthMessage('Ops')));
  }
}

function* singOutUser() {
  const userToken = localStorage.getItem('user');
  try {
    if (userToken) {
      localStorage.removeItem('user');
      yield put(userSignOutSuccess(userToken));
    } else {
      yield put(userSignOutSuccess(userToken));
    }
  } catch (error) {
    yield put(yield put(showAuthMessage('Erro interno')));
  }
}


export function* signInUser() {
  yield takeEvery(SIGNIN_USER, singInUser);
}

export function* signOutUser() {
  yield takeLatest(SIGNOUT_USER, singOutUser);
}


export default function* rootSaga() {
  yield all([
    fork(signInUser),
    fork(signOutUser)]);
}

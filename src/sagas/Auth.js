import {
  all,
  fork,
  put,
  takeLatest,
  takeEvery,
  call,
} from 'redux-saga/effects';

import { SIGNIN_USER, SIGNOUT_USER } from 'constants/ActionTypes';

import {
  showAuthMessage,
  userSignInSuccess,
  userSignOutSuccess,
} from 'actions/Auth';
import { SessionApi } from 'api/SessionApi';

const sessionRequest = value => SessionApi.createNewSession(value);

function* singInUser(action) {
  try {
    const teste = yield call(sessionRequest, action.payload);
    if (teste.data) {
      async function reqItem(headers) {
        const req = await localStorage.setItem('user', JSON.stringify(headers));
        const res = localStorage.getItem('user', JSON.stringify(headers));
        return await res
      }
      if (teste.headers) {
        const teste2 = yield call(reqItem, teste.headers)
        yield put(userSignInSuccess(teste2))
      }
    }
  } catch (errors) {
    yield put(yield put(showAuthMessage('Usuário ou senha incorretos')));
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
  yield all([fork(signInUser), fork(signOutUser)]);
}

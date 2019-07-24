/* eslint-disable no-unused-expressions */
import {
  all, fork, put, call, takeEvery
} from 'redux-saga/effects';
import { showAuthMessageSuccess, showAuthMessageFaild } from 'actions/User';
import { createNewUserRequest } from 'api/api';
import { CREATE_NEW_USER } from '../constants/ActionTypes';


const createUserRequest = (name, email, password) => {
  const user = { name, email, password };
  return createNewUserRequest(user);
};

function* createNewUSer(user) {
  const userObject = user.payload;
  const {name, email, password} = userObject;
  try {
    const response = yield call(createUserRequest, name, email, password);
    if (response.data.user) {
      yield put(showAuthMessageSuccess());
    } else {
      yield put(showAuthMessageFaild('Algo deu errado, tente novamente'));
    }

  } catch (error) {
    yield put(showAuthMessageFaild('Erro interno do sistema'));
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

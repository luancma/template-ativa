/* eslint-disable no-unused-expressions */
import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import {
  showAuthMessageSuccess,
  showAuthMessageFaild,
  fetchAllUserSuccess,
} from 'actions/User';

import { UsersApi } from 'api/UsersApi';
import { CREATE_NEW_USER, RECEIVE_USERS } from '../constants/ActionTypes';

const createUserRequest = (name, email, password) => {
  const user = { name, email, password };
  return UsersApi.createNewUserRequest(user);
};

const fetchAllUsersRequest = () => UsersApi.getUsersRequest();

function* createNewUSer(user) {
  const userObject = user.payload;
  const { name, email, password } = userObject;
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

function* fetchAllUsers() {
  try {
    const response = yield call(fetchAllUsersRequest);
    if (response.data.users) {
      const res = response.data.users;
      yield put(fetchAllUserSuccess(res));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* receiveUsers() {
  yield takeEvery(RECEIVE_USERS, fetchAllUsers);
}
export function* createUser() {
  yield takeEvery(CREATE_NEW_USER, createNewUSer);
}

export default function* rootSaga() {
  yield all([fork(createUser), fork(receiveUsers)]);
}

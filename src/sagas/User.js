/* eslint-disable no-unused-expressions */
import {
  all, fork, put, call, takeEvery
} from 'redux-saga/effects';
import validator from 'email-validator';
import { showAuthMessageSuccess, showAuthMessageFaild } from 'actions/User';
import Axios from 'axios';
import { CREATE_NEW_USER } from '../constants/ActionTypes';


const createUserRequest = (name, email, password) => {
  const user = { name, email, password };
  return Axios.post('https://private-anon-0deaec33b0-ativamanagerapi.apiary-mock.com/api/v1/users', user);
};


function validateEmail(user) {
  if (validator.validate(`${user.email}`) === true) {
    return true;
  }
  return false;
}

function* createNewUSer(user) {
  const userObject = user.payload;
  if (validateEmail(userObject) === true) {
    const {name, email, password} = userObject;
    const response = yield call(createUserRequest, name, email, password);
    if (response.data) {
      yield put(showAuthMessageSuccess('Usuário criado com sucesso!'));
    }
    if (response.err) {
      yield put(showAuthMessageFaild('Ops!'));
    }
  } else {
    yield put(showAuthMessageFaild('The passwords dont match!'));
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

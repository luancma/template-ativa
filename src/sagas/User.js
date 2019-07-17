import { all, fork, put, takeLatest, takeEvery } from "redux-saga/effects";
import { showAuthMessage } from "actions/Auth";
import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  SHOW_MESSAGE
} from "../constants/ActionTypes";

function* getToken() {
  try {
    const userToken = localStorage.getItem("user");
    console.log(JSON.parse(userToken));
    alert("Salvo");
    yield put(yield put(showAuthMessage("Salvo")));
  } catch (error) {
    yield put(yield put(showAuthMessage("Ops")));
  }
}

function* errorMenssager() {
  yield put(yield put(showAuthMessage("Erro interno")));
}

export function* createUser() {
  yield takeEvery(CREATE_USER, getToken);
}

export function* showError() {
  yield takeEvery(SHOW_MESSAGE, errorMenssager);
}

export default function* rootSaga() {
  yield all([fork(createUser), fork(showError)]);
}

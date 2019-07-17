/* eslint-disable import/no-named-as-default */
import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import createUser from "./User";

export default function* rootSaga(getState) {
  yield all([authSagas()]);
}

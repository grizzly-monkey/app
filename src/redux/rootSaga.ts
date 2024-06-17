import { all } from "redux-saga/effects";
import todos from "./todos/sagas";
import sessionSaga from "./session/sagas";
import accountSaga from "./account/sagas";
import userSaga from "./user/sagas";

export default function* rootSaga() {
  yield all([todos(), sessionSaga(), accountSaga(),userSaga()]);
}

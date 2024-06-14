import { all } from "redux-saga/effects";
import todos from "./todos/sagas";
import userSaga from "./user/sagas";

export default function* rootSaga() {
  yield all([todos(),userSaga()]);
}

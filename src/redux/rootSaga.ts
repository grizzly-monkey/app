import { all } from "redux-saga/effects";
import todos from "./todos/sagas";

export default function* rootSaga() {
  yield all([todos()]);
}

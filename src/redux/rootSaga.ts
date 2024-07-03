import { all } from "redux-saga/effects";
import sessionSaga from "./session/sagas";
import accountSaga from "./account/sagas";
import userSaga from "./user/sagas";
import organizationSaga from "./organization/sagas";
import inventorySaga from "./inventory/sagas";

export default function* rootSaga() {
  yield all([sessionSaga(), accountSaga(), userSaga(), organizationSaga(), inventorySaga()]);
}

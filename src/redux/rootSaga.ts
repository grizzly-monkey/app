import { all } from "redux-saga/effects";
import sessionSaga from "./session/sagas";
import accountSaga from "./account/sagas";
import userSaga from "./user/sagas";
import farmSaga from './farm/sagas'
import organizationSaga from "./organization/sagas";
import inventorySaga from "./inventory/sagas";

export default function* rootSaga() {
  yield all([sessionSaga(), accountSaga(), userSaga(), farmSaga(), organizationSaga(), inventorySaga()]);
}
  

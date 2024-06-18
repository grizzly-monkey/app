import ErrorModel from "@/models/error/errorModel";
import { SagaAction } from "@/types/redux";
import { runEffect } from "@/utilities/actionUtility";
import { all, call, cancel, takeEvery } from "redux-saga/effects";
import AccountActions from "./actions";
import AccountEffects from "./effects";
import { router } from "@/routes";

function* REQUEST_REGISTER(action: SagaAction): Generator {
  const result = yield call(
    runEffect,
    action,
    AccountEffects.requestRegister,
    action.payload
  );

  if (result instanceof ErrorModel) yield cancel();

  router.navigate("/users");
}

export default function* rootSaga(): Generator {
  yield all([takeEvery(AccountActions.REQUEST_REGISTER, REQUEST_REGISTER)]);
}

import ErrorModel from "@/models/error/errorModel";
import { router } from "@/routes";
import { SagaAction } from "@/types/redux";
import { runEffect } from "@/utilities/actionUtility";
import { all, call, cancel, takeEvery } from "redux-saga/effects";
import AccountActions from "./actions";
import AccountEffects from "./effects";
import { successToast } from "@/utilities/toast";
import routePaths from "@/config/routePaths";
import { getTranslation } from "@/translation/i18n";

function* REQUEST_REGISTER(action: SagaAction): Generator {
  const result = yield call(
    runEffect,
    action,
    AccountEffects.requestRegister,
    action.payload
  );

  if (result instanceof ErrorModel) yield cancel();

  successToast(getTranslation("signUp.accountCreatedSuccessfully"));
  router.navigate(routePaths.login);
}

export default function* rootSaga(): Generator {
  yield all([takeEvery(AccountActions.REQUEST_REGISTER, REQUEST_REGISTER)]);
}

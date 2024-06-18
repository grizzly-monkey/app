import ErrorModel from "@/models/error/errorModel";
import { router } from "@/routes";
import { SagaAction } from "@/types/redux";
import { runEffect } from "@/utilities/actionUtility";
import { CognitoUser } from "amazon-cognito-identity-js";
import { all, call, cancel, put, takeEvery } from "redux-saga/effects";
import SessionActions from "./actions";
import SessionEffects from "./effects";
import UserPool from "./UserPool";

export function getCognitoUser(phoneNumber: string) {
  return new CognitoUser({
    Username: phoneNumber,
    Pool: UserPool(),
    Storage: {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
      clear: () => undefined,
    },
  });
}

function* REQUEST_LOGIN(action: SagaAction): Generator {
  const cognitoUserObject: CognitoUser = getCognitoUser(
    `+${action.payload.phoneNumber}`
  );
  yield put(SessionActions.setCognitoUserObj(cognitoUserObject));

  const result: any = yield call(
    runEffect,
    action,
    SessionEffects.requestLogin,
    cognitoUserObject,
    action.payload.phoneNumber,
    action.payload.password
  );

  if (result instanceof ErrorModel) yield cancel();

  yield put(SessionActions.setUserTokens(result));

  router.navigate("/users");
}

export default function* rootSaga(): Generator {
  yield all([takeEvery(SessionActions.REQUEST_LOGIN, REQUEST_LOGIN)]);
}

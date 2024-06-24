import { takeEvery, all, call, put, cancel } from "redux-saga/effects";
import UserActions from "./actions";
import { createAction, runEffect } from "@/utilities/actionUtility";
import UserEffects from "./effects";
import { SagaAction } from "@/types/redux";
import UserModel from "./models/createModels/userModel";
import removeEmpty from "@/utilities/objectUtility";
import { CognitoUser } from "amazon-cognito-identity-js";
import { getCognitoUserObject } from "../session/sagas";
import { resultHasError } from "@/utilities/onError";
import { successToast } from "@/utilities/toast";
import { router } from "@/routes";

function* FETCH_USERS(action: SagaAction) {
  yield call(runEffect, action, UserEffects.getUsers);
}

function* CREATE_USER(action: SagaAction) {
  const user = new UserModel(action.payload);
  yield call(
    runEffect,
    action,
    UserEffects.createUser,
    removeEmpty(user.toJSON())
  );
}

function* REQUEST_RESET_PASSWORD_OTP(action: SagaAction) {
  const cognitoUserObject: CognitoUser = getCognitoUserObject(
    `+${action.payload.phoneNumber}`
  );

  yield call(
    runEffect,
    action,
    UserEffects.sendResetPasswordOTP,
    cognitoUserObject
  );
}

function* RESET_PASSWORD(action: SagaAction): Generator {
  const cognitoUserObject: CognitoUser = getCognitoUserObject(
    `+${action.payload.phoneNumber}`
  );

  const result: any = yield call(
    runEffect,
    action,
    UserEffects.resetPasswordByOtp,
    cognitoUserObject,
    action.payload.otp,
    action.payload.password
  );

  if (resultHasError(result)) yield cancel();

  yield put(
    createAction(UserActions.REQUEST_RESET_PASSWORD_OTP_FINISHED, false)
  );

  successToast("Password updated successfully!!");
  router.navigate("/login");
}

export default function* userSaga() {
  yield all([
    takeEvery(UserActions.FETCH_USERS, FETCH_USERS),
    takeEvery(UserActions.CREATE_USER, CREATE_USER),
    takeEvery(
      UserActions.REQUEST_RESET_PASSWORD_OTP,
      REQUEST_RESET_PASSWORD_OTP
    ),
    takeEvery(UserActions.RESET_PASSWORD, RESET_PASSWORD),
  ]);
}

import { takeEvery, all, call, put, cancel } from "redux-saga/effects";
import UserActions from "./actions";
import { createAction, runEffect } from "@/utilities/actionUtility";
import UserEffects from "./effects";
import { SagaAction } from "@/types/redux";
import UserModel from "./models/createModels/userModel";
import removeEmpty from "@/utilities/objectUtility";
import { CognitoUser } from "amazon-cognito-identity-js";
import { getCognitoUser } from "../session/sagas";
import SessionActions from "../session/actions";
import { resultHasError } from "@/utilities/onError";
import { successToast } from "@/utilities/toast";
import { router } from "@/routes";
import { t } from "i18next";

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
  const cognitoUserObject: CognitoUser = getCognitoUser(
    `+${action.payload.phoneNumber}`
  );

  yield put(SessionActions.setCognitoUserObj(cognitoUserObject));

  yield call(
    runEffect,
    action,
    UserEffects.sendResetPasswordOTP,
    cognitoUserObject
  );
}

function* RESET_PASSWORD(action: SagaAction): Generator {
  const cognitoUserObject: CognitoUser = getCognitoUser(
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

function* PATCH_USER(action: SagaAction) {
  yield call(runEffect, action, UserEffects.updateUser, {
    id: action.payload.id,
    data: action.payload.data,
  });
}

function* DELETE_USER(action: SagaAction) {
  yield call(runEffect, action, UserEffects.deleteUser, action.payload);
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
    takeEvery(UserActions.UPDATE_USER_FIRST_NAME, PATCH_USER),
    takeEvery(UserActions.UPDATE_USER_LAST_NAME, PATCH_USER),
    takeEvery(UserActions.UPDATE_USER_ROLES, PATCH_USER),
    takeEvery(UserActions.DELETE_USER, DELETE_USER),
  ]);
}

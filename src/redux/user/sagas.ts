import { takeEvery, all, call, put, select, cancel } from "redux-saga/effects";
import UserActions from "./actions";
import { runEffect } from "@/utilities/actionUtility";
import UserEffects from "./effects";
import { SagaAction } from "@/types/redux";
import UserModel from "./models/createModels/userModel";
import removeEmpty from "@/utilities/objectUtility";
import { CognitoUser } from "amazon-cognito-identity-js";
import { getCognitoUser } from "../session/sagas";
import SessionActions from "../session/actions";
import SessionSelectors from "../session/selectors";
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

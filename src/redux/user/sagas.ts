import { takeEvery, all, call, put, cancel, select } from "redux-saga/effects";
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
import UserSelectors from "./selectors";
import { getTranslation } from "@/translation/i18n";

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

function* REQUEST_RESET_PASSWORD_OTP(action: SagaAction): Generator {
  const cognitoUserObject: CognitoUser = getCognitoUserObject(
    `+${action.payload.phone}`
  );

  const result: any = yield call(
    runEffect,
    action,
    UserEffects.sendResetPasswordOTP,
    cognitoUserObject
  );

  if (resultHasError(result)) yield cancel();

  successToast(getTranslation("forgotPassword.otpSentSuccessfully"));
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

  successToast(getTranslation("forgotPassword.passwordUpdatedSuccess"));
  router.navigate("/login");
}

function* PATCH_USER(action: SagaAction) {
  yield call(runEffect, action, UserEffects.updateUser, {
    id: action.payload.id,
    data: action.payload.data,
  });
}

function* DELETE_USER(action: SagaAction): Generator {
  const result: any = yield call(
    runEffect,
    action,
    UserEffects.deleteUser,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
  successToast("User deleted successfully!!");
  const users: any = yield select(UserSelectors.selectNormalizedUsers);
  const userIds = users.result.filter(
    (userId: string) => userId !== action.payload
  );
  const { [action.payload]: _, ...newUsers } = users?.entities?.users;
  yield put(
    UserActions.updateUsersLocally({
      result: userIds,
      entities: { users: newUsers },
    })
  );
  yield put(UserActions.unSelectUser());
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

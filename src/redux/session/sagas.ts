import { TOKEN_EXPIRE_TIME } from "@/config/consts";
import routePaths from "@/config/routePaths";
import { router } from "@/routes";
import { SagaAction } from "@/types/redux";
import { runEffect } from "@/utilities/actionUtility";
import {
  getIsAuthenticated,
  setAuthStatusInLocalStorage,
} from "@/utilities/localStorage";
import { resultHasError } from "@/utilities/onError";
import { CognitoUser } from "amazon-cognito-identity-js";
import { all, call, cancel, put, takeEvery } from "redux-saga/effects";
import { store } from "../store";
import SessionActions from "./actions";
import SessionEffects from "./effects";
import UserPool from "./UserPool";
import CognitoSessionModel from "./models/login/CognitoSessionModel";
import { SessionActionTypes } from "./actionTypes";

export function getCognitoUserObject(phoneNumber: string) {
  return new CognitoUser({
    Username: phoneNumber,
    Pool: UserPool(),
  });
}

const getCurrentUser = () => {
  return UserPool().getCurrentUser();
};

const getSession = async () => {
  return await new Promise((resolve, reject) => {
    const user = getCurrentUser();

    if (user) {
      user.getSession((err: any, session: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(session);
        }
      });
    } else {
      reject();
    }
  });
};

function* REFRESH_TOKEN_SILENTLY(): Generator {
  try {
    const result: any = yield call(getSession);
    const cognitoSession = new CognitoSessionModel({
      refreshToken: result?.refreshToken?.token,
      idToken: result?.idToken?.jwtToken,
      accessToken: result?.accessToken?.jwtToken,
      userDetails: result?.idToken?.payload,
    });

    yield put(SessionActions.setUserTokens(cognitoSession));
    yield call(SCHEDULE_REFRESH);
  } catch (error) {
    console.log(error);
  }
}

function* SCHEDULE_REFRESH() {
  const onTimeout = () => {
    store.dispatch(SessionActions.refreshTokenSilently());
  };
  const worker = new Worker("/timeoutWorker.ts");
  worker.onmessage = onTimeout;
  worker.postMessage({ time: Math.ceil(TOKEN_EXPIRE_TIME * 0.95) * 1000 });
}

function* REQUEST_LOGIN(action: SagaAction): Generator {
  yield put(SessionActions.setAccountApprovalStatus(""));

  const cognitoUserObject: CognitoUser = getCognitoUserObject(
    `+${action.payload.phoneNumber}`
  );

  const result: any = yield call(
    runEffect,
    action,
    SessionEffects.requestLogin,
    cognitoUserObject,
    `+${action.payload.phoneNumber}`,
    action.payload.password
  );

  if (resultHasError(result)) yield cancel();

  if (result.userDetails) {
    const isVerifiedByAdmin = result.userDetails?.["custom:isVerifiedByAdmin"];

    if (isVerifiedByAdmin === "0") {
      yield put(SessionActions.setUserTokens(result));
      yield call(SCHEDULE_REFRESH);
      setAuthStatusInLocalStorage(true);
      router.navigate(routePaths.organization);
    } else if (isVerifiedByAdmin === "1") {
      yield put(
        SessionActions.setAccountApprovalStatus(
          "You are not authorized to login. Please wait for admin approval."
        )
      );
    } else if (isVerifiedByAdmin === "2") {
      yield put(
        SessionActions.setAccountApprovalStatus(
          "Your account approval is rejected by admin. Please contact to admin at app-approvals@growloc.com."
        )
      );
    }
  }
}

function* INIT() {
  if (getIsAuthenticated()) {
    yield call(REFRESH_TOKEN_SILENTLY);
  }
}

function* LOGINFLOW() {
  yield takeEvery(SessionActionTypes.REQUEST_LOGIN, REQUEST_LOGIN);
  yield takeEvery(
    SessionActionTypes.REQUEST_REFRESH_TOKEN_SILENTLY,
    REFRESH_TOKEN_SILENTLY
  );
}

export default function* rootSaga() {
  yield all([LOGINFLOW(), INIT()]);
}

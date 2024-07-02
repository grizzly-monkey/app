import { LOCAL_STORAGE_KEYS, TOKEN_EXPIRE_TIME } from "@/config/consts";
import routePaths from "@/config/routePaths";
import { router } from "@/routes";
import { SagaAction } from "@/types/redux";
import { createAction, runEffect } from "@/utilities/actionUtility";
import {
  getIsAuthenticated,
  getPreferenceValueFromStorage,
  setAuthStatusInLocalStorage,
  setPreferenceValueInStorage,
} from "@/utilities/localStorage";
import { resultHasError } from "@/utilities/onError";
import { CognitoUser } from "amazon-cognito-identity-js";
import { all, call, cancel, put, takeEvery } from "redux-saga/effects";
import { store } from "../store";
import SessionActions from "./actions";
import SessionEffects from "./effects";
import UserPool from "./UserPool";
import CognitoSessionModel from "./models/login/CognitoSessionModel";
import URLParamsConstant from "@/config/URLParamsConstant";
import { changeLanguage } from "i18next";
import AppActions from "../actions";

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

export function* RESET_REDUX_STORE() {
  yield put(createAction(AppActions.RESET_STORE));
}

function* REFRESH_TOKEN_SILENTLY(): Generator {
  try {
    const result: any = yield call(getSession);
    const cognitoSession = new CognitoSessionModel({
      refreshToken: result?.refreshToken?.token,
      idToken: result?.idToken?.jwtToken,
      accessToken: result?.accessToken?.jwtToken,
    });

    yield put(SessionActions.setUserTokens(cognitoSession));
    yield put(SessionActions.setUserDetails(result?.idToken?.payload));
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
      yield put(SessionActions.setUserTokens(result.tokens));
      yield put(SessionActions.setUserDetails(result.userDetails));

      yield call(SCHEDULE_REFRESH);
      yield call(GET_LANGUAGE_FROM_STORAGE);
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

function* GET_LANGUAGE_FROM_STORAGE(): Generator {
  const searchParams = new URLSearchParams(window.location.search);
  const language = searchParams.get(URLParamsConstant.LANGUAGE);

  if (language) {
    yield put(SessionActions.changeLanguage(language));
    yield cancel();
  }

  const languagePreference: any = yield getPreferenceValueFromStorage(
    LOCAL_STORAGE_KEYS.language
  );

  yield put(
    SessionActions.changeLanguage(
      languagePreference ? languagePreference : "en"
    )
  );
}

function* GET_LANGUAGE_FROM_STORAGE_FINISHED(action: SagaAction) {
  // const urlParameter = {
  //   [URLParamsConstant.FARM_ID]: action.payload,
  // }
  // setURLParameters(urlParameter)

  changeLanguage(action.payload);

  yield call(
    setPreferenceValueInStorage,
    LOCAL_STORAGE_KEYS.language,
    action.payload
  );
}

function* LOGOUT() {
  const user = getCurrentUser();

  user?.signOut();
  yield call(RESET_REDUX_STORE);
  yield call(setAuthStatusInLocalStorage, false);
  localStorage.clear();
  router.navigate(routePaths.login);
}

function* INIT() {
  if (getIsAuthenticated()) {
    yield call(REFRESH_TOKEN_SILENTLY);
    yield call(GET_LANGUAGE_FROM_STORAGE);
  }
}

function* LOGINFLOW() {
  yield takeEvery(SessionActions.REQUEST_LOGIN, REQUEST_LOGIN);
  yield takeEvery(
    SessionActions.REQUEST_REFRESH_TOKEN_SILENTLY,
    REFRESH_TOKEN_SILENTLY
  );
  yield takeEvery(
    SessionActions.GET_LANGUAGE_FROM_STORAGE,
    GET_LANGUAGE_FROM_STORAGE
  );
  yield takeEvery(
    SessionActions.GET_LANGUAGE_FROM_STORAGE_FINISHED,
    GET_LANGUAGE_FROM_STORAGE_FINISHED
  );
  yield takeEvery(SessionActions.LOGOUT, LOGOUT);
}

export default function* rootSaga() {
  yield all([LOGINFLOW(), INIT()]);
}

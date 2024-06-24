import { loginType } from "@/types/auth";
import { createAction } from "@/utilities/actionUtility";
import { SessionActionTypes } from "./actionTypes";
import CognitoSessionModel from "./models/login/CognitoSessionModel";

const SessionActions = {
  login: (values: loginType) =>
    createAction(SessionActionTypes.REQUEST_LOGIN, values),

  setUserTokens: (token: CognitoSessionModel) =>
    createAction(SessionActionTypes.SET_USER_TOKENS, { token }),

  setAccountApprovalStatus: (status: string) =>
    createAction(SessionActionTypes.ACCOUNT_APPROVAL_STATUS, status),

  refreshTokenSilently: () =>
    createAction(SessionActionTypes.REQUEST_REFRESH_TOKEN_SILENTLY),
};
export default SessionActions;

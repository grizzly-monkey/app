import { loginType } from "@/types/auth";
import { createAction } from "@/utilities/actionUtility";
import CognitoSessionModel from "./models/login/CognitoSessionModel";
import { CognitoUser } from "amazon-cognito-identity-js";

const SessionActions = {
  REQUEST_LOGIN: "session/REQUEST_LOGIN",
  REQUEST_LOGIN_FINISHED: "session/REQUEST_LOGIN_FINISHED",
  SET_COGNITO_USER_OBJ: "session/SET_COGNITO_USER_OBJ",
  SET_USER_TOKENS: "session/SET_USER_TOKENS",
  ACCOUNT_APPROVAL_STATUS: "session/ACCOUNT_APPROVAL_STATUS",
  REQUEST_REFRESH_TOKEN_SILENTLY: "session/REQUEST_REFRESH_TOKEN_SILENTLY",

  login: (values: loginType) =>
    createAction(SessionActions.REQUEST_LOGIN, values),

  setCognitoUserObj: (cognitoUserObject: CognitoUser) =>
    createAction(SessionActions.SET_COGNITO_USER_OBJ, { cognitoUserObject }),

  setUserTokens: (token: CognitoSessionModel) =>
    createAction(SessionActions.SET_USER_TOKENS, { token }),

  setAccountApprovalStatus: (status: string) =>
    createAction(SessionActions.ACCOUNT_APPROVAL_STATUS, status),

  refreshTokenSilently: () =>
    createAction(SessionActions.REQUEST_REFRESH_TOKEN_SILENTLY),
};
export default SessionActions;

import { loginType } from "@/types/auth";
import { createAction } from "@/utilities/actionUtility";
import CognitoSessionModel from "./models/login/CognitoSessionModel";

const SessionActions = {
  REQUEST_LOGIN: "session/REQUEST_LOGIN",
  REQUEST_LOGIN_FINISHED: "session/REQUEST_LOGIN_FINISHED",
  SET_COGNITO_USER_OBJ: "session/SET_COGNITO_USER_OBJ",
  SET_USER_TOKENS: "session/SET_USER_TOKENS",

  login: (values: loginType) =>
    createAction(SessionActions.REQUEST_LOGIN, values),

  setCognitoUserObj: (cognitoUserObject: any) =>
    createAction(SessionActions.SET_COGNITO_USER_OBJ, { cognitoUserObject }),

  setUserTokens: (token: CognitoSessionModel) =>
    createAction(SessionActions.SET_USER_TOKENS, { token }),
};
export default SessionActions;

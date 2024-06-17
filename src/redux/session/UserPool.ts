import { COGNITO_CLIENT_ID, COGNITO_POOL_ID } from "@/config/config";
import { CognitoUserPool } from "amazon-cognito-identity-js";

export default () =>
  new CognitoUserPool({
    UserPoolId: COGNITO_POOL_ID,
    ClientId: COGNITO_CLIENT_ID,
    Storage: window.sessionStorage,
  });

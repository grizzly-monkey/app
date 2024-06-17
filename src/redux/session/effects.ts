import ErrorModel from "@/models/error/errorModel";
import { AuthenticationDetails } from "amazon-cognito-identity-js";
import ErrorDetail from "../../models/error/errorDetail";
import CognitoSessionModel from "./models/login/CognitoSessionModel";

export function getErrorInstanceFromCognitoError(err: any): ErrorModel {
  const error = new ErrorModel();
  const errorDetails: any = new ErrorDetail();
  error.exception = err?.code;
  errorDetails.error = err?.error;
  errorDetails.message = err?.message || "Unknown error occurred";
  error.errors = [errorDetails];
  return error;
}

interface Callbacks {
  onSuccess: (data: any) => void;
  onFailure: (err: any) => void;
}

export function getCallbacks(resolve: (value: any) => void): Callbacks {
  return {
    onSuccess: (data) => {
      const cognitoSession = new CognitoSessionModel({
        refreshToken: data?.refreshToken?.token,
        idToken: data?.idToken?.jwtToken,
        accessToken: data?.accessToken?.jwtToken,
      });
      resolve(cognitoSession);
    },
    onFailure: (err) => {
      const error = getErrorInstanceFromCognitoError(err);
      resolve(error);
    },
  };
}

export default class SessionEffects {
  static requestLogin(
    user: any,
    phoneNumber: string,
    password: string
  ): Promise<any> {
    return new Promise((resolve) => {
      const authDetails = new AuthenticationDetails({
        Username: phoneNumber,
        Password: password,
      });

      user.authenticateUser(authDetails, getCallbacks(resolve));
    });
  }
}

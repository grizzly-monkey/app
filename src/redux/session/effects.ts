import ErrorModel from "@/models/error/errorModel";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import ErrorDetail from "../../models/error/errorDetail";
import CognitoSessionModel from "./models/login/CognitoSessionModel";

const exceptionMapper = (err: { code: string; message: string }): string => {
  switch (err?.code) {
    case "UserNotConfirmedException":
      return "User is not verified. Kindly verify yourself by checking your email ";
    case "NotAuthorizedException":
      return err.message || "Incorrect phone number or password";
    case "ExpiredCodeException":
      return "OTP has expired please enter a new OTP ";
    case "CodeMismatchException":
      return "Invalid OTP";
    case "LimitExceededException":
      return "Attempt limit exceeded, please try after some time ";
    case "PasswordResetRequiredException":
      return "You are required to reset your password. Kindly click on forgot password and set a new password";
    default:
      return "Something went wrong.";
  }
};

export function getErrorInstanceFromCognitoError(err: any): ErrorModel {
  const error = new ErrorModel();
  const errorDetails: any = new ErrorDetail();
  error.exception = err?.code;
  errorDetails.error = err?.error;
  errorDetails.message = exceptionMapper(err);
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
      resolve({ tokens: cognitoSession, userDetails: data?.idToken?.payload });
    },
    onFailure: (err) => {
      const error = getErrorInstanceFromCognitoError(err);
      resolve(error);
    },
  };
}

export default class SessionEffects {
  static requestLogin(
    user: CognitoUser,
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

import { CognitoUser } from "amazon-cognito-identity-js";
import { BaseModel } from "sjs-base-model";

export default class CognitoSessionModel extends BaseModel {
  accessToken: any = null;

  refreshToken: any = null;

  idToken: any = null;

  userDetails = CognitoUser;

  constructor(data: Partial<CognitoSessionModel>) {
    super();
    this.update(data);
  }
}

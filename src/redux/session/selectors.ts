import { RootState } from "../store";

class SessionSelectors {
  static SelectCognitoUserObject = (state: RootState) =>
    state.session.cognitoUserObject;

  static SelectToken = (state: RootState) => state.session.token;
  static SelectAccountApprovalStatus = (state: RootState) =>
    state.session.accountApprovalStatus;
}

export default SessionSelectors;

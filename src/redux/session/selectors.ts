import { RootState } from "../store";

class SessionSelectors {
  static SelectCognitoUserObject = (state: RootState) =>
    state.session.cognitoUserObject;

  static SelectToken = (state: RootState) => state.session.token;
}

export default SessionSelectors;

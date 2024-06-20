import SessionActions from "./actions";
import BaseReducer from "@/utilities/baseReducer";

export const initialState = {
  cognitoUserObject: null,
  token: null,
};

export default BaseReducer(
  initialState,
  {
    [SessionActions.SET_COGNITO_USER_OBJ](state, action) {
      const cognitoUserObject = { ...action.payload.cognitoUserObject };
      return { ...state, cognitoUserObject };
    },
    [SessionActions.SET_USER_TOKENS](state, action) {
      return { ...state, token: action.payload.token };
    },
  },
  false
);

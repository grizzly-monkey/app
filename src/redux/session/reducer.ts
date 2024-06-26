import BaseReducer from "@/utilities/baseReducer";
import SessionActions from "./actions";

export const initialState = {
  token: null,
  accountApprovalStatus: null,
};

export default BaseReducer(
  initialState,
  {
    [SessionActions.SET_USER_TOKENS](state, action) {
      return { ...state, token: action.payload.token };
    },
    [SessionActions.ACCOUNT_APPROVAL_STATUS](state, action) {
      return { ...state, accountApprovalStatus: action.payload };
    },
  },
  false
);

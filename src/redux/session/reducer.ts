import BaseReducer from "@/utilities/baseReducer";
import { SessionActionTypes } from "./actionTypes";

export const initialState = {
  token: null,
  accountApprovalStatus: null,
};

export default BaseReducer(
  initialState,
  {
    [SessionActionTypes.SET_USER_TOKENS](state, action) {
      return { ...state, token: action.payload.token };
    },
    [SessionActionTypes.ACCOUNT_APPROVAL_STATUS](state, action) {
      return { ...state, accountApprovalStatus: action.payload };
    },
  },
  false
);

import BaseReducer from "@/utilities/baseReducer";
import UserActions from "./actions";
import userNormalizeSchema, { addNormalizeUser } from "./schema";

const initialState = {
  users: {},
  passwordResetOTPSent: null,
  selectedUser: {},
  updatedUser: {},
};

export default BaseReducer(initialState, {
  [UserActions.FETCH_USERS_FINISHED](state, action) {
    return {
      ...state,
      users: userNormalizeSchema(action.payload),
    };
  },
  [UserActions.CREATE_USER_FINISHED](state, action) {
    return {
      ...state,
      users: addNormalizeUser(state.users, action.payload),
    };
  },
  [UserActions.SELECT_USER](state, action) {
    return {
      ...state,
      selectedUser: action.payload,
    };
  },
  [UserActions.UNSELECT_USER](state) {
    return {
      ...state,
      selectedUser: null,
    };
  },
  [UserActions.REQUEST_RESET_PASSWORD_OTP_FINISHED](state, action) {
    return { ...state, passwordResetOTPSent: action.payload };
  },
});

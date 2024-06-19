import { createAction } from "@/utilities/actionUtility";
import { CreateUser, User } from "../../pages/userManagement/types";
import { forgotPasswordType, sendOTPType } from "@/types/auth";

const UserActions = {
  FETCH_USERS: "FETCH_USERS",
  FETCH_USERS_FINISHED: "FETCH_USERS_FINISHED",
  CREATE_USER: "CREATE_USER",
  CREATE_USER_FINISHED: "CREATE_USER_FINISHED",
  SELECT_USER: "SELECT_USER",
  SELECT_USER_FINISHED: "SELECT_USER_FINISHED",
  UNSELECT_USER: "UNSELECT_USER",
  UNSELECT_USER_FINISHED: "UNSELECT_USER_FINISHED",
  REQUEST_RESET_PASSWORD_OTP: "users/REQUEST_RESET_PASSWORD_OTP",
  REQUEST_RESET_PASSWORD_OTP_FINISHED:
    "users/REQUEST_RESET_PASSWORD_OTP_FINISHED",
  RESET_PASSWORD: "users/RESET_PASSWORD",
  RESET_PASSWORD_FINISHED: "users/RESET_PASSWORD_FINISHED",

  fetchUsers() {
    return createAction(this.FETCH_USERS);
  },

  createUser(payload: CreateUser) {
    return createAction(this.CREATE_USER, payload);
  },

  selectUser(payload: User) {
    return createAction(this.SELECT_USER, payload);
  },

  unSelectUser() {
    return createAction(this.UNSELECT_USER);
  },

  sendResetPasswordOTP(payload: sendOTPType) {
    return createAction(this.REQUEST_RESET_PASSWORD_OTP, payload);
  },

  resetPasswordWithOTP(payload: forgotPasswordType) {
    return createAction(this.RESET_PASSWORD, payload);
  },
};

export default UserActions;

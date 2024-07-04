import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { userDenormalizeSchema } from "./schema";

class UserSelectors {

  public static selectNormalizedUsers(state: any) {
    return state?.users?.users;
  }

  public static selectSelectedUser(state: any) {
    return state.users.selectedUser;
  }
  
  public static selectUpdatedUser(state: any) {
    return state.users.updatedUser;
  
  }

  static selectUsers = createSelector(
    (state) => state?.users?.users,
    (normalizedUser) => userDenormalizeSchema(normalizedUser)
  );

  static SelectResetOTPSent = (state: RootState) =>
    !!state?.users?.passwordResetOTPSent;
}

export default UserSelectors;

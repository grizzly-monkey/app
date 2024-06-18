import { RootState } from "../store";
import { userDenormalizeSchema } from "./schema";

class UserSelectors {
  public static selectUsers(state: any) {
    return userDenormalizeSchema(state?.users?.users);
  }

  public static selectSelectedUser(state: any) {
    return state.users.selectedUser;
  }

  static SelectResetOTPSent = (state: RootState) =>
    !!state?.users?.passwordResetOTPSent;
}

export default UserSelectors;

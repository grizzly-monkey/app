import { registerType } from "@/types/auth";
import { createAction } from "@/utilities/actionUtility";

const AccountActions = {
  REQUEST_REGISTER: "session/REQUEST_REGISTER",
  REQUEST_REGISTER_FINISHED: "session/REQUEST_REGISTER_FINISHED",

  register: (values: registerType) =>
    createAction(AccountActions.REQUEST_REGISTER, values),
};
export default AccountActions;

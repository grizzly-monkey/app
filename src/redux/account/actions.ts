import { registerType } from "@/types/auth";
import { createAction } from "@/utilities/actionUtility";

const AccountActions = {
  REQUEST_REGISTER: "account/REQUEST_REGISTER",
  REQUEST_REGISTER_FINISHED: "account/REQUEST_REGISTER_FINISHED",

  register: (values: registerType) =>
    createAction(AccountActions.REQUEST_REGISTER, values),
};
export default AccountActions;

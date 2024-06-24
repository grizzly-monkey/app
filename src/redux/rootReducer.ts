import { combineReducers, Action } from "redux";
import session from "./session/reducer";
import account from "./account/reducer";
import error from "./error/errorReducer";
import requesting from "./requesting/requestingReducer";
import users from "./user/reducer";
import organizations from "./organization/reducer";

const appReducer = combineReducers({
  session,
  account,
  error,
  requesting,
  users,
  organizations,
});

const rootReducer = (
  state: any,
  action: Action
): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;

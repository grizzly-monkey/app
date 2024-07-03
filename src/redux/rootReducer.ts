import { combineReducers, Action } from "redux";
import session from "./session/reducer";
import account from "./account/reducer";
import error from "./error/errorReducer";
import requesting from "./requesting/requestingReducer";
import users from "./user/reducer";
import organizations from "./organization/reducer";
import inventories from "./inventory/reducer";

const appReducer = combineReducers({
  session,
  account,
  error,
  requesting,
  users,
  organizations,
  inventories,
});

const rootReducer = (
  state: any,
  action: Action
): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;

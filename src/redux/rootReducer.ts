import { combineReducers, Action } from "redux";
import session from "./session/reducer";
import account from "./account/reducer";
import error from "./error/errorReducer";
import requesting from "./requesting/requestingReducer";
import users from "./user/reducer";
import farms from "./farm/reducer";
import organizations from "./organization/reducer";
import inventories from "./inventory/reducer";
import AppActions from "./actions";

const appReducer = combineReducers({
  session,
  account,
  error,
  requesting,
  users,
  farms,
  organizations,
  inventories,
});

const rootReducer = (
  state: any,
  action: Action
): ReturnType<typeof appReducer> => {
  if (action.type === AppActions.RESET_STORE) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;

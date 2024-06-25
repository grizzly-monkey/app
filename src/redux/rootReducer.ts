import { combineReducers, Action } from "redux";
import todos from "./todos/reducer";
import session from "./session/reducer";
import account from "./account/reducer";
import error from "./error/errorReducer";
import requesting from "./requesting/requestingReducer";
import users from "./user/reducer";
import farms from './farm/reducer'

const appReducer = combineReducers({
  todos,
  session,
  account,
  error,
  requesting,
  users,
  farms
});

const rootReducer = (
  state: any,
  action: Action
): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;

import { combineReducers, Action } from "redux";
import todos from "./todos/reducer";
import session from "./session/reducer";
import account from "./account/reducer";
import error from "./error/errorReducer";
import requesting from "./requesting/requestingReducer";

const appReducer = combineReducers({
  todos,
  session,
  account,
  error,
  requesting,
});

const rootReducer = (
  state: any,
  action: Action
): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;

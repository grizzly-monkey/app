import { combineReducers, Action } from "redux";
import todos from "./todos/reducer";
import users from  "./user/reducer"
import requestingReducer from "./requesting/requestingReducer";

const appReducer = combineReducers({
  todos,
  users,
  requesting: requestingReducer,
});

const rootReducer = (
  state: any,
  action: Action
): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;

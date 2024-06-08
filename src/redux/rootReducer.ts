import { combineReducers, Action } from "redux";
import todos from "./todos/reducer";

const appReducer = combineReducers({
  todos,
});

const rootReducer = (
  state: any,
  action: Action
): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;

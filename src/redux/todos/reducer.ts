import BaseReducer from "@/utilities/baseReducer";
import { todosListNormalizeSchema } from "./Schema";
import TodosActions from "./actions";

const initialState = {
  todos: {},
};

export default BaseReducer(initialState, {
  [TodosActions.REQUEST_TODOS_FINISHED](state, action) {
    return {
      ...state,
      todos: todosListNormalizeSchema(action.payload),
    };
  },
});

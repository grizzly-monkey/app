import { createAction } from "@/utilities/actionUtility";

const TodosActions = {
  REQUEST_TODOS: "todos/REQUEST_TODOS",
  REQUEST_TODOS_FINISHED: "todos/REQUEST_TODOS_FINISHED",

  fetchTodos() {
    return createAction(this.REQUEST_TODOS);
  },
};
export default TodosActions;

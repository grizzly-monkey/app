import api from "@/utilities/api";
import { getToModel } from "@/utilities/effectUtility";
import TodosList from "./models/TodosList";

export default class TodosEffects {
  static getTodos() {
    return getToModel(TodosList, api.TODOS);
  }
}

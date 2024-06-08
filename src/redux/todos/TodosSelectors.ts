import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { todosListDenormalizeSchema } from "./Schema";
import { normalizeData } from "@/types/normalize";

export default class TodosSelectors {
  static SelectTodosList = (state: RootState): normalizeData =>
    state?.todos?.todos;

  static SelectDenormalizeTodosList = createSelector(
    (state) => state?.todos?.todos,
    (normalizedTodosList) => todosListDenormalizeSchema(normalizedTodosList)
  );
}

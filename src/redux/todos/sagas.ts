import { all, call, takeEvery } from "redux-saga/effects";
import { runEffect } from "@/utilities/actionUtility";
import { SagaAction } from "@/types/redux";
import TodosActions from "./actions";
import TodosEffects from "./effects";

function* REQUEST_TODOS(action: SagaAction) {
  yield call(runEffect, action, TodosEffects.getTodos);
}

export default function* rootSaga() {
  yield all([takeEvery(TodosActions.REQUEST_TODOS, REQUEST_TODOS)]);
}

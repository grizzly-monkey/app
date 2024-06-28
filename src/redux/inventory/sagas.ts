import { all, call, takeEvery } from "redux-saga/effects";
import InventoryActions from "./actions";
import { SagaAction } from "@/types/redux";
import { runEffect } from "@/utilities/actionUtility";
import InventoryEffects from "./effects";

function* FETCH_INVENTORIES(action: SagaAction) {
  yield call(runEffect, action, InventoryEffects.getInventories);
}

export default function* inventorySaga() {
  yield all([takeEvery(InventoryActions.FETCH_INVENTORIES, FETCH_INVENTORIES)]);
}

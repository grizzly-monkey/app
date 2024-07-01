import { all, call, takeEvery } from "redux-saga/effects";
import InventoryActions from "./actions";
import { SagaAction } from "@/types/redux";
import { runEffect } from "@/utilities/actionUtility";
import InventoryEffects from "./effects";

function* FETCH_INVENTORIES(action: SagaAction) {
  yield call(runEffect, action, InventoryEffects.getInventories);
}

function* FETCH_SUBCATEGORIES(action: SagaAction) {
  yield call(runEffect, action, InventoryEffects.getSubCategories);
}

function* CREATE_INVENTORY(action: SagaAction) {
  yield call(runEffect, action, InventoryEffects.createInventory);
}

function* CREATE_PRODUCT(action: SagaAction) {
  yield call(runEffect, action, InventoryEffects.createProduct);
}

export default function* inventorySaga() {
  yield all([
    takeEvery(InventoryActions.FETCH_INVENTORIES, FETCH_INVENTORIES) ,
    takeEvery(InventoryActions.FETCH_SUBCATEGORIES, FETCH_SUBCATEGORIES),
    takeEvery(InventoryActions.CREATE_INVENTORY, CREATE_INVENTORY),
    takeEvery(InventoryActions.CREATE_PRODUCT, CREATE_PRODUCT)
  ]);
}

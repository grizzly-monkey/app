import { all, call, cancel, put, select, takeEvery } from "redux-saga/effects";
import InventoryActions from "./actions";
import { SagaAction } from "@/types/redux";
import { runEffect } from "@/utilities/actionUtility";
import InventoryEffects from "./effects";
import { ProductModel } from "./models/createModels/productModel";
import { InventoryModel } from "./models/createModels/inventoryModel";
import { resultHasError } from "@/utilities/onError";
import { successToast } from "@/utilities/toast";
import { router } from "@/routes";
import InventorySelectors from "./selectors";

function* FETCH_INVENTORIES(action: SagaAction) {
  yield call(runEffect, action, InventoryEffects.getInventories);
}

function* FETCH_SUBCATEGORIES(action: SagaAction) {
  yield call(runEffect, action, InventoryEffects.getSubCategories);
}

function* CREATE_INVENTORY(action: SagaAction): Generator {
  const inventory = new InventoryModel(action.payload);
  const result: any = yield call(
    runEffect,
    action,
    InventoryEffects.createInventory,
    inventory
  );
  if (resultHasError(result)) yield cancel();

  successToast("Inventory created successfully");
  router.navigate("/inventory");
}

function* CREATE_PRODUCT(action: SagaAction): Generator {
  const product = new ProductModel(action.payload);
  const result: any = yield call(
    runEffect,
    action,
    InventoryEffects.createProduct,
    product
  );
  if (resultHasError(result)) yield cancel();

  successToast("Product creation requested successfully");
}

function* PATCH_INVENTORY(action: SagaAction): Generator {
  const result: any = yield call(
    runEffect,
    action,
    InventoryEffects.patchInventory,
    action.payload
  );
  if (resultHasError(result)) yield cancel();

  successToast("Inventory updated successfully");
}

function* DELETE_INVENTORY(action: SagaAction): Generator {
  const result: any = yield call(
    runEffect,
    action,
    InventoryEffects.deleteInventory,
    action.payload
  );
  if (resultHasError(result)) yield cancel();

  successToast("Inventory deleted successfully");

  const inventories :any = yield select(InventorySelectors.selectNormalizedInventories);
  const inventoryIds = inventories.result.filter(
    (inventoryId: string) => inventoryId !== action.payload
  );

  const { [action.payload]: _, ...newInventories } = inventories?.entities?.inventories;
  yield put(
    InventoryActions.updateInventoriesLocally({
      result: inventoryIds,
      entities: { inventories: newInventories },
    })
  );
  yield put(InventoryActions.unselectInventory());
}
export default function* inventorySaga() {
  yield all([
    takeEvery(InventoryActions.FETCH_INVENTORIES, FETCH_INVENTORIES),
    takeEvery(InventoryActions.FETCH_SUBCATEGORIES, FETCH_SUBCATEGORIES),
    takeEvery(InventoryActions.CREATE_INVENTORY, CREATE_INVENTORY),
    takeEvery(InventoryActions.CREATE_PRODUCT, CREATE_PRODUCT),
    takeEvery(InventoryActions.PATCH_INVENTORY, PATCH_INVENTORY),
    takeEvery(InventoryActions.DELETE_INVENTORY, DELETE_INVENTORY),
  ]);
}

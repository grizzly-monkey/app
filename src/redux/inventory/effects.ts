import api from "@/utilities/api";
import { delToModel, getToModel, postToModel, putToModel } from "@/utilities/effectUtility";
import InventoryModel from "./models/getModels/inventoryModel";
import { SubCategoryModel } from "./models/getModels/subCategoryModel";
import FarmSelectors from "../farm/FarmSelectors";
import { store } from "../store";

class InventoryEffects {
  static getInventories() {
    const selectedFarmId = FarmSelectors.SelectSelectedFarmId(store.getState())
    return getToModel(InventoryModel, `${api.INVENTORIESWITHOUTFARMID}/${selectedFarmId}`);
  }

  static getSubCategories() {
    return getToModel(SubCategoryModel, api.SUBCATEGORIES);
  }

  static createInventory(payload: any) {
    return postToModel(InventoryModel, api.INVENTORIESWITHOUTFARMID, payload);
  }

  static createProduct(payload: any) {
    return postToModel(InventoryModel, api.PRODUCTS, payload);
  }

  static patchInventory(payload: any) {
    return putToModel(InventoryModel, `${api.INVENTORIESWITHOUTFARMID}/${payload.id}`, payload.data);
  }

  static deleteInventory(id: string) {
    return delToModel(InventoryModel, `${api.INVENTORIESWITHOUTFARMID}/${id}`);
  }
}

export default InventoryEffects;

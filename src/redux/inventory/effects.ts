import api from "@/utilities/api";
import { delToModel, getToModel, patchToModel, postToModel } from "@/utilities/effectUtility";
import InventoryModel from "./models/getModels/inventoryModel";
import { SubCategoryModel } from "./models/getModels/subCategoryModel";

class InventoryEffects {
  static getInventories() {
    return getToModel(InventoryModel, api.INVENTORIES);
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
    return patchToModel(InventoryModel, `${api.INVENTORIESWITHOUTFARMID}/${payload.id}`, payload.data);
  }

  static deleteInventory(id: string) {
    return delToModel(InventoryModel, `${api.INVENTORIESWITHOUTFARMID}/${id}`);
  }
}

export default InventoryEffects;

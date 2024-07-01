import api from "@/utilities/api";
import { getToModel, postToModel } from "@/utilities/effectUtility";
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
    return postToModel(InventoryModel, api.INVENTORIES, payload);
  }

  static createProduct(payload: any) {
    return postToModel(InventoryModel, api.PRODUCTS, payload);
  }
}

export default InventoryEffects;

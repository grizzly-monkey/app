import api from "@/utilities/api";
import { getToModel } from "@/utilities/effectUtility";
import InventoryModel from "./models/getModels/inventoryModel";

class InventoryEffects {
  static getInventories() {
    return getToModel(InventoryModel, api.INVENTORIES);
  }
}

export default InventoryEffects;

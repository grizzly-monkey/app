import { inventoryDenormalizeSchema } from "./schema";

class InventorySelectors{
    public static getInventories(state: any){
        return inventoryDenormalizeSchema(state?.inventories?.inventories)
    }
}

export default InventorySelectors;
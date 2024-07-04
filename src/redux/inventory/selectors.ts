import { inventoryDenormalizeSchema, subCategoryDenormalizeSchema } from "./schema";

class InventorySelectors{
    public static selectInventories(state: any){
        return inventoryDenormalizeSchema(state?.inventories?.inventories)
    }

    public static selectNormalizedInventories(state: any){
        return state?.inventories?.inventories
    }

    public static selectSubCategories(state: any){
        return subCategoryDenormalizeSchema(state?.inventories?.subCategories)
    }

    public static selectSubCategoryById(state: any, id: string){
        return state?.inventories?.subCategories[id]
    }

    public static selectSelectedInventory(state: any){
        return state?.inventories?.selectedInventory
    }
}

export default InventorySelectors;
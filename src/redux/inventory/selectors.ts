import { inventoryDenormalizeSchema, subCategoryDenormalizeSchema } from "./schema";

class InventorySelectors{
    public static getInventories(state: any){
        return inventoryDenormalizeSchema(state?.inventories?.inventories)
    }

    public static getSubCategories(state: any){
        return subCategoryDenormalizeSchema(state?.inventories?.subCategories)
    }
}

export default InventorySelectors;
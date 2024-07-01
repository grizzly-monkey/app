import { createAction } from "@/utilities/actionUtility";

const InventoryActions = {
    FETCH_INVENTORIES :"inventories/FETCH_INVENTORIES",
    FETCH_INVENTORIES_FINISHED :"inventories/FETCH_INVENTORIES_FINISHED",
    FETCH_SUBCATEGORIES :"inventories/FETCH_SUBCATEGORIES",
    FETCH_SUBCATEGORIES_FINISHED :"inventories/FETCH_SUBCATEGORIES_FINISHED",
    CREATE_INVENTORY :"inventories/CREATE_INVENTORY",
    CREATE_INVENTORY_FINISHED :"inventories/CREATE_INVENTORY_FINISHED",
    CREATE_PRODUCT :"inventories/CREATE_PRODUCT",
    CREATE_PRODUCT_FINISHED :"inventories/CREATE_PRODUCT_FINISHED",

    fetchInventories(){
        return createAction(this.FETCH_INVENTORIES);
    },

    fetchSubCategories(){
        return createAction(this.FETCH_SUBCATEGORIES);
    },

    createInventory(payload: any){
        return createAction(this.CREATE_INVENTORY, payload);
    },
    
    createProduct(payload: any){
        return createAction(this.CREATE_PRODUCT, payload);
    }

}

export default InventoryActions;
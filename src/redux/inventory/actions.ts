import { createAction } from "@/utilities/actionUtility";

const InventoryActions = {
    FETCH_INVENTORIES :"inventories/FETCH_INVENTORIES",
    FETCH_INVENTORIES_FINISHED :"inventories/FETCH_INVENTORIES_FINISHED",

    fetchInventories(){
        return createAction(this.FETCH_INVENTORIES);
    }
}

export default InventoryActions;
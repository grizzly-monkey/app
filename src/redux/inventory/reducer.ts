import BaseReducer from "@/utilities/baseReducer";
import InventoryActions from "./actions";
import invertoryNormalizeSchema from "./schema";

const initialState = {
  inventories: {},
  selectedInventory: null,
  updatedInventory: {},
};

export default BaseReducer(initialState, {
  [InventoryActions.FETCH_INVENTORIES_FINISHED](state, action) {
    return {
      ...state,
      inventories: invertoryNormalizeSchema(action.payload),
    };
  },
  // [InventoryActions.CREATE_INVENTORY_FINISHED](state, action) {
  //     return {
  //         ...state,
  //         inventory: addNormalizeInventory(state.inventory, action.payload),
  //     };
  // },
  // [InventoryActions.SELECT_INVENTORY](state, action) {
  //     return {
  //         ...state,
  //         selectedInventory: action.payload,
  //     };
  // },
  // [InventoryActions.UNSELECT_INVENTORY](state) {
  //     return {
  //         ...state,
  //         selectedInventory: null,
  //     };
  // },
  // [InventoryActions.UPDATE_INVENTORIES_LOCALLY](state, action) {
  //     return {
  //         ...state,
  //         inventory: action.payload,
  //     };
  // }
});

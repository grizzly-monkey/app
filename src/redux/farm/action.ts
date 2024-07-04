import { Farm, Polyhouse } from "@/pages/farm/types";
import { normalizeData } from "@/types/normalize";
import { createAction } from "@/utilities/actionUtility";

const FarmActions = {
  REQUEST_FARMS: "farms/REQUEST_FARMS",
  REQUEST_FARMS_FINISHED: "farms/REQUEST_FARMS_FINISHED",
  ADD_FARM:'farms/ADD_FARM',
  ADD_FARM_FINISHED:'farms/ADD_FARM_FINISHED',
  ADD_POLYHOUSE_TO_FARM:'farms/ADD_POLYHOUSE_TO_FARM',
  ADD_POLYHOUSE_TO_FARM_FINISHED:'farms/ADD_POLYHOUSE_TO_FARM_FINISHED',
  SET_SELECTED_FARM:'farms/SET_SELECTED_FARM',
  UPDATE_FARM:'farms/UPDATE_FARM',
  UPDATE_FARM_FINISHED:'farms/UPDATE_FARM_FINISHED',
  UPDATE_FARM_LOCALLY:'farms/UPDATE_FARM_LOCALLY',
  DELETE_FARM:'farms/DELETE_FARM',
  GET_FARM_FROM_STORAGE: "farms/GET_FARM_FROM_STORAGE",
  GET_FARM_FROM_STORAGE_FINISHED: "farms/GET_FARM_FROM_STORAGE_FINISHED",

  fetchFarms(isRefresh = false) {
    return createAction(this.REQUEST_FARMS, isRefresh);
  },

  addFarm(payload : Farm) {
    return createAction(this.ADD_FARM, payload)
  },

  addPolyhousesToFarm(payload : Polyhouse) {
    return createAction(this.ADD_POLYHOUSE_TO_FARM, payload)
  },

  setSelectedFarm(farm: Farm | null) {
    return createAction(this.SET_SELECTED_FARM, farm)
  },

  updateFarm (fieldName:string,updatedFarmValue:object) {
    return createAction(this.UPDATE_FARM, updatedFarmValue, false,
      {
        scope: fieldName,
      },)
  },

  updateFarmLocally (selectedFarm:Farm | null, farms:normalizeData) {
    return createAction(this.UPDATE_FARM_LOCALLY, {selectedFarm, farms})
  },

  deleteFarm() {
    return createAction(this.DELETE_FARM)
  },

  selectFarm(farmId: string | null) {
    return createAction(this.GET_FARM_FROM_STORAGE_FINISHED, farmId);
  },

  getFarmFromStorage() {
    return createAction(this.GET_FARM_FROM_STORAGE);
  },
};
export default FarmActions;

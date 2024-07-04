import { createAction } from "@/utilities/actionUtility";

const FarmActions = {
  REQUEST_FARMS: "farms/REQUEST_FARMS",
  REQUEST_FARMS_FINISHED: "farms/REQUEST_FARMS_FINISHED",
  ADD_FARM: "farms/ADD_FARM",
  ADD_FARM_FINISHED: "farms/ADD_FARM_FINISHED",
  GET_FARM_FROM_STORAGE: "farms/GET_FARM_FROM_STORAGE",
  GET_FARM_FROM_STORAGE_FINISHED: "farms/GET_FARM_FROM_STORAGE_FINISHED",

  fetchFarms() {
    return createAction(this.REQUEST_FARMS);
  },

  selectFarm(farmId: string | null) {
    return createAction(this.GET_FARM_FROM_STORAGE_FINISHED, farmId);
  },

  getFarmFromStorage() {
    return createAction(this.GET_FARM_FROM_STORAGE);
  },

  addFarm(payload: any) {
    return createAction(this.ADD_FARM, payload);
  },
};
export default FarmActions;

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

  fetchFarms(isRefresh = false) {
    return createAction(this.REQUEST_FARMS, isRefresh);
  },

  addFarm(payload) {
    return createAction(this.ADD_FARM, payload)
  },

  addPolyhousesToFarm(payload) {
    return createAction(this.ADD_POLYHOUSE_TO_FARM, payload)
  },

  setSelectedFarm(farm) {
    return createAction(this.SET_SELECTED_FARM, farm)
  },


};
export default FarmActions;

import BaseReducer from "@/utilities/baseReducer";
import FarmActions from "./action";
import { addFarmNormalizedSchema, farmNormalizeSchema } from "./Schema";

const initialState = {
  farms: {},
  selectedFarmId: null,
};

export default BaseReducer(initialState, {
  [FarmActions.REQUEST_FARMS_FINISHED](state, action) {
    return {
      ...state,
      farms: farmNormalizeSchema(action.payload),
    };
  },
  [FarmActions.ADD_FARM_FINISHED](state, action) {
    return {
      ...state,
      farms: addFarmNormalizedSchema(state?.farms, action.payload),
    };
  },
  [FarmActions.GET_FARM_FROM_STORAGE_FINISHED](state, action) {
    return {
      ...state,
      selectedFarmId: action.payload,
    };
  },
});

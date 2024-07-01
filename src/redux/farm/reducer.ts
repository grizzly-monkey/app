import BaseReducer from "@/utilities/baseReducer";
import FarmActions from "./action";
import { addFarmNormalizedSchema, farmNormalizeSchema } from "./Schema";

const initialState = {
  farms: {},
  selectedFarm:null,
  // selectedFarm: {
  //   farmId: 'fmc999c4e1',
  //   id: '667bff8a75c34842b7e7e261',
  //   organisationId: 'or63bcc3a4',
  //   name: 'ABCD1',
  //   area: 5647,
  //   cultivableArea: 5467,
  //   location: {
  //     address: 'Pune',
  //     lat: 1.24,
  //     'long': 1.24
  //   },
  //   polyhouses: [],
  //   reservoirs: [
  //     {
  //       reservoirId: 're710d7483',
  //       name: 'Reserviour1',
  //       reservoirCapacity: 567,
  //       nutrientWaterReservoirCapacity: 43,
  //       phReservoirCapacity: 65,
  //       stockNutrientSolutionCapacity: 67,
  //       createdBy: '21f3bd3a-9011-70fd-8aba-8ed6189af0fe',
  //       updatedBy: '21f3bd3a-9011-70fd-8aba-8ed6189af0fe',
  //       createdDate: '2024-06-26T11:46:18.381Z',
  //       updatedDate: '2024-06-26T11:46:18.381Z'
  //     }
  //   ],
  //   nutrient: {
  //     type: '3 part mix',
  //     dilutionRatio: {
  //       numerator: 2,
  //       denominator: 3
  //     }
  //   },
  //   device: null,
  //   state: 'DRAFT',
  //   createdBy: '21f3bd3a-9011-70fd-8aba-8ed6189af0fe',
  //   updatedBy: '21f3bd3a-9011-70fd-8aba-8ed6189af0fe',
  //   createdDate: '2024-06-26T11:46:18.381Z',
  //   updatedDate: '2024-06-26T11:46:18.381Z'
  // }
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
      selectedFarm: action.payload
    };
  },
  [FarmActions.SET_SELECTED_FARM](state, action) {
    return {
      ...state,
      selectedFarm: action.payload
    };
  },
});

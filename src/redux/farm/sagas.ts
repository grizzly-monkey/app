import { all, call, takeEvery, select } from "redux-saga/effects";
import { runEffect } from "@/utilities/actionUtility";
import { SagaAction } from "@/types/redux";
import FarmActions from "./action";
import FarmsEffects from "./effects";
import FarmSelectors from "./FarmSelectors";

function* REQUEST_FARMS(action: SagaAction) {
  const farms = yield select(FarmSelectors.SelectDenormalizeFarm)
  if(farms.length === 0 || action.payload)
   yield call(runEffect, action, FarmsEffects.getFarms);
}

function* ADD_FARM(action: SagaAction) {
  const {payload} = action
  const result = yield call(runEffect, action, FarmsEffects.addFarm, payload)
}

function* ADD_POLYHOUSE_TO_FARM(action: SagaAction) {
  const {payload} = action
  const {farmId} = yield select(FarmSelectors.SelectSelectedFarm)
  const result = yield call(runEffect, action, FarmsEffects.addPolyhouseToFarm, farmId,payload)
}

function* UPDATE_FARM(action: SagaAction) {
  const {payload} = action
  const {farmId} = yield select(FarmSelectors.SelectSelectedFarm)
  const result = yield call(runEffect, action, FarmsEffects.updateFarm, farmId ,payload)
}


export default function* rootSaga() {
  yield all(
    [
      takeEvery(FarmActions.REQUEST_FARMS, REQUEST_FARMS),
      takeEvery(FarmActions.ADD_FARM,ADD_FARM),
      takeEvery(FarmActions.ADD_POLYHOUSE_TO_FARM,ADD_POLYHOUSE_TO_FARM),
      takeEvery(FarmActions.UPDATE_FARM,UPDATE_FARM),
    ]
  );
}

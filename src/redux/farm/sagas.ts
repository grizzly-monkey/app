import { all, call, takeEvery, select, cancel, put } from "redux-saga/effects";
import { runEffect } from "@/utilities/actionUtility";
import { SagaAction } from "@/types/redux";
import FarmActions from "./action";
import FarmsEffects from "./effects";
import FarmSelectors from "./FarmSelectors";
import { resultHasError } from "@/utilities/onError";

function* REQUEST_FARMS(action: SagaAction) {
  const farms = yield select(FarmSelectors.SelectDenormalizeFarm)
  if(farms.length === 0 || action.payload)
   yield call(runEffect, action, FarmsEffects.getFarms);
}

function* ADD_FARM(action: SagaAction) {
  const {payload} = action
  const result = yield call(runEffect, action, FarmsEffects.addFarm, payload)
  if (resultHasError(result)) yield cancel()
}

function* ADD_POLYHOUSE_TO_FARM(action: SagaAction) {
  const {payload} = action
  const {farmId} = yield select(FarmSelectors.SelectSelectedFarm)
  const result = yield call(runEffect, action, FarmsEffects.addPolyhouseToFarm, farmId,payload)
  if (resultHasError(result)) yield cancel()
}

function* UPDATE_FARM(action: SagaAction) {
  const {payload} = action
  const {farmId}= yield select(FarmSelectors.SelectSelectedFarm)
  const result = yield call(runEffect, action, FarmsEffects.updateFarm, farmId ,payload)
  if (resultHasError(result)) yield cancel()

  const farms = yield select(FarmSelectors.SelectFarmList)
  const updatedFarms = {
    entities: {
      ...farms.entities,
      [farmId] : result
    },
    ...farms.result
  }

  yield put(FarmActions.updateFarmLocally(result, updatedFarms))
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

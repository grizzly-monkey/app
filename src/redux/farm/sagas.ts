import { all, call, takeEvery, select, cancel, put } from "redux-saga/effects";
import { runEffect } from "@/utilities/actionUtility";
import { SagaAction } from "@/types/redux";
import FarmActions from "./action";
import FarmsEffects from "./effects";
import FarmSelectors from "./FarmSelectors";
import { resultHasError } from "@/utilities/onError";
import { Farm } from "@/pages/farm/types";
import { normalizeData } from "@/types/normalize";
import ErrorModel from "@/models/error/errorModel";

function* REQUEST_FARMS(action: SagaAction) {
  const farms: Farm[] = yield select(FarmSelectors.SelectDenormalizeFarm);
  if (farms.length === 0 || action.payload)
    yield call(runEffect, action, FarmsEffects.getFarms);
}

function* ADD_FARM(action: SagaAction) {
  const { payload } = action;
  yield call(runEffect, action, FarmsEffects.addFarm, payload);
}

function* ADD_POLYHOUSE_TO_FARM(action: SagaAction) {
  const { payload } = action;
  const { farmId } = yield select(FarmSelectors.SelectSelectedFarm);
  yield call(
    runEffect,
    action,
    FarmsEffects.addPolyhouseToFarm,
    farmId,
    payload
  );
}

function* UPDATE_FARM(action: SagaAction) {
  const { payload } = action;
  const { farmId } = yield select(FarmSelectors.SelectSelectedFarm);
  const result: Farm | ErrorModel = yield call(
    runEffect,
    action,
    FarmsEffects.updateFarm,
    farmId,
    payload
  );
  if (resultHasError(result as ErrorModel)) yield cancel();

  const farms: normalizeData = yield select(FarmSelectors.SelectFarmList);
  const updatedFarms = {
    entities: {
      farms : {
        ...farms.entities.farms,
        [farmId]: result,
      }
    },
    result: farms.result,
  };

  console.log("updated farm", updatedFarms, farms)
  yield put(FarmActions.updateFarmLocally(result as Farm, updatedFarms));
}


function* DELETE_FARM(action: SagaAction) {
  const { farmId } = yield select(FarmSelectors.SelectSelectedFarm);

  const result: Farm | ErrorModel = yield call(
    runEffect,
    action,
    FarmsEffects.deleteFarm,
    farmId,
  );
  if (resultHasError(result as ErrorModel)) yield cancel();

  const farms: normalizeData = yield select(FarmSelectors.SelectFarmList);
  
  const updatedResult = (farms.result as string[]).filter((id: string) => id !== farmId);
  const { [farmId]: _, ...newFarmsEntities } = farms.entities.farms;

  const updatedFarms = {
    entities: {
      farms: {...newFarmsEntities},
    },
    result: updatedResult,
  };

  yield put(FarmActions.updateFarmLocally(null, updatedFarms));
}

export default function* rootSaga() {
  yield all([
    takeEvery(FarmActions.REQUEST_FARMS, REQUEST_FARMS),
    takeEvery(FarmActions.ADD_FARM, ADD_FARM),
    takeEvery(FarmActions.ADD_POLYHOUSE_TO_FARM, ADD_POLYHOUSE_TO_FARM),
    takeEvery(FarmActions.UPDATE_FARM, UPDATE_FARM),
    takeEvery(FarmActions.DELETE_FARM, DELETE_FARM),
  ]);
}

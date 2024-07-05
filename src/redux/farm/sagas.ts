import { resultHasError } from "@/utilities/onError";
import URLParamsConstant from "@/config/URLParamsConstant";
import {
  getPreferenceValueFromStorage,
  setPreferenceValueInStorage,
} from "@/utilities/localStorage";
import FarmSelectors from "./FarmSelectors";
import { LOCAL_STORAGE_KEYS } from "@/config/consts";
import { all, call, takeEvery, select, cancel, put } from "redux-saga/effects";
import { runEffect } from "@/utilities/actionUtility";
import { SagaAction } from "@/types/redux";
import FarmActions from "./action";
import FarmsEffects from "./effects";
import { Farm, Polyhouse } from "@/pages/farm/types";
import { normalizeData } from "@/types/normalize";
import ErrorModel from "@/models/error/errorModel";
import { successToast } from "@/utilities/toast";

function* REQUEST_FARMS(action: SagaAction) {
  const farms: Farm[] = yield select(FarmSelectors.SelectDenormalizeFarm);
  if (farms.length === 0 || action.payload)
    yield call(runEffect, action, FarmsEffects.getFarms);

  yield put(FarmActions.getFarmFromStorage());
}

function* ADD_FARM(action: SagaAction) {
  const { payload } = action;
  yield call(runEffect, action, FarmsEffects.addFarm, payload);
}

function* ADD_POLYHOUSE_TO_FARM(action: SagaAction) {
  const { payload } = action;
  const { farmId } = yield select(FarmSelectors.SelectSelectedFarm);
  const result: Polyhouse | ErrorModel = yield call(
    runEffect,
    action,
    FarmsEffects.addPolyhouseToFarm,
    farmId,
    payload
  );

  if (resultHasError(result as ErrorModel)) yield cancel();

  const farms: normalizeData = yield select(FarmSelectors.SelectFarmList);

  const updatedFarms = {
    entities: {
      farms: {...farms.entities.farms,[farmId]: {...farms.entities.farms[farmId], polyhouses: result} },
    },
    result: farms.result,
  };


  yield put(FarmActions.updateFarmLocally(null, updatedFarms));
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
      farms: {
        ...farms.entities.farms,
        [farmId]: result,
      },
    },
    result: farms.result,
  };

  yield put(FarmActions.updateFarmLocally(result as Farm, updatedFarms));
}

function* DELETE_FARM(action: SagaAction) {
  const { farmId } = yield select(FarmSelectors.SelectSelectedFarm);

  const result: Farm | ErrorModel = yield call(
    runEffect,
    action,
    FarmsEffects.deleteFarm,
    farmId
  );
  if (resultHasError(result as ErrorModel)) yield cancel();

  const farms: normalizeData = yield select(FarmSelectors.SelectFarmList);

  const updatedResult = (farms.result as string[]).filter(
    (id: string) => id !== farmId
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [farmId]: _, ...newFarmsEntities } = farms.entities.farms;

  const updatedFarms = {
    entities: {
      farms: { ...newFarmsEntities },
    },
    result: updatedResult,
  };

  successToast("Farm is successfully deleted");
  yield put(FarmActions.updateFarmLocally(null, updatedFarms));
}

function* GET_FARM_FROM_STORAGE(): Generator {
  const searchParams = new URLSearchParams(window.location.search);
  const farmId = searchParams.get(URLParamsConstant.FARM_ID);

  if (farmId) {
    yield put(FarmActions.selectFarm(farmId));
    yield cancel();
  }

  const farm: any = yield getPreferenceValueFromStorage(
    LOCAL_STORAGE_KEYS.farm
  );
  if (farm) yield put(FarmActions.selectFarm(farm));
  else {
    const farms: any = yield select(FarmSelectors.SelectDenormalizeFarm);

    if (farms.length === 0) {
      yield put(FarmActions.selectFarm(null));
    } else {
      yield put(FarmActions.selectFarm(farms[0].farmId));
    }
  }
}

function* GET_FARM_FROM_STORAGE_FINISHED(action: SagaAction) {
  // const urlParameter = {
  //   [URLParamsConstant.FARM_ID]: action.payload,
  // }
  // setURLParameters(urlParameter)

  yield call(
    setPreferenceValueInStorage,
    LOCAL_STORAGE_KEYS.farm,
    action.payload
  );
}

export default function* rootSaga() {
  yield all([
    takeEvery(FarmActions.REQUEST_FARMS, REQUEST_FARMS),
    takeEvery(FarmActions.ADD_FARM, ADD_FARM),
    takeEvery(FarmActions.ADD_POLYHOUSE_TO_FARM, ADD_POLYHOUSE_TO_FARM),
    takeEvery(FarmActions.UPDATE_FARM, UPDATE_FARM),
    takeEvery(FarmActions.DELETE_FARM, DELETE_FARM),
    takeEvery(FarmActions.GET_FARM_FROM_STORAGE, GET_FARM_FROM_STORAGE),
    takeEvery(
      FarmActions.GET_FARM_FROM_STORAGE_FINISHED,
      GET_FARM_FROM_STORAGE_FINISHED
    ),
  ]);
}

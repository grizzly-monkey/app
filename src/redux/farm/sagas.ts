import { all, call, cancel, put, select, takeEvery } from "redux-saga/effects";
import { runEffect } from "@/utilities/actionUtility";
import { SagaAction } from "@/types/redux";
import FarmActions from "./action";
import FarmsEffects from "./effects";
import { resultHasError } from "@/utilities/onError";
import URLParamsConstant from "@/config/URLParamsConstant";
import {
  getPreferenceValueFromStorage,
  setPreferenceValueInStorage,
} from "@/utilities/localStorage";
import FarmSelectors from "./FarmSelectors";
import { LOCAL_STORAGE_KEYS } from "@/config/consts";

function* REQUEST_FARMS(action: SagaAction): Generator {
  const result: any = yield call(runEffect, action, FarmsEffects.getFarms);

  if (resultHasError(result)) {
    yield cancel();
  }

  yield put(FarmActions.getFarmFromStorage());
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

function* ADD_FARM(action: SagaAction): Generator {
  const { payload } = action;
  const { nutrientType, nutrientDilutionRatio, ...remainingFields } = payload;
  const [numerator, denominator] = nutrientDilutionRatio.split(":").map(Number);
  const farmPayload = {
    ...remainingFields,
    nutrient: {
      type: nutrientType,
      dilutionRatio: {
        numerator: parseInt(numerator),
        denominator: parseInt(denominator),
      },
    },
    area: parseFloat(remainingFields.area),
    cultivableArea: parseFloat(remainingFields.cultivableArea),
  };
  console.log(
    "ADD_FARM",
    action,
    payload,
    nutrientType,
    nutrientDilutionRatio,
    farmPayload
  );

  const result = yield call(
    runEffect,
    action,
    FarmsEffects.addFarm,
    farmPayload
  );
}

export default function* rootSaga() {
  yield all([
    takeEvery(FarmActions.REQUEST_FARMS, REQUEST_FARMS),
    takeEvery(FarmActions.ADD_FARM, ADD_FARM),
    takeEvery(FarmActions.GET_FARM_FROM_STORAGE, GET_FARM_FROM_STORAGE),
    takeEvery(
      FarmActions.GET_FARM_FROM_STORAGE_FINISHED,
      GET_FARM_FROM_STORAGE_FINISHED
    ),
  ]);
}

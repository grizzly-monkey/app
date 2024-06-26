import { all, call, takeEvery } from "redux-saga/effects";
import { runEffect } from "@/utilities/actionUtility";
import { SagaAction } from "@/types/redux";
import FarmActions from "./action";
import FarmsEffects from "./effects";

function* REQUEST_FARMS(action: SagaAction) {
  const result = yield call(runEffect, action, FarmsEffects.getFarms);

  console.log("result", result)

}

function* ADD_FARM(action: SagaAction) {
  const {payload} = action
  const {nutrientType, nutrientDilutionRatio, ...remainingFields} = payload
  const [numerator, denominator] = nutrientDilutionRatio.split(':').map(Number)
  const farmPayload = {
    ...remainingFields,
    nutrient:{
      type: nutrientType,
      dilutionRatio: {
        numerator: parseInt(numerator),
        denominator: parseInt(denominator),
      },
    },
    area:parseFloat(remainingFields.area),
    cultivableArea:parseFloat(remainingFields.cultivableArea)
  }
  console.log("ADD_FARM", action, payload, nutrientType, nutrientDilutionRatio, farmPayload)

  const result = yield call(runEffect, action, FarmsEffects.addFarm, farmPayload)

}

export default function* rootSaga() {
  yield all(
    [
      takeEvery(FarmActions.REQUEST_FARMS, REQUEST_FARMS),
      takeEvery(FarmActions.ADD_FARM,ADD_FARM)
    ]
  );
}

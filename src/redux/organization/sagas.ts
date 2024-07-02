import { SagaAction } from "@/types/redux";
import { runEffect } from "@/utilities/actionUtility";
import { all, call, takeEvery } from "redux-saga/effects";
import OrganizationActions from "./actions";
import OrganizationEffects from "./effects";
import { setPreferenceValueInStorage } from "@/utilities/localStorage";
import { LOCAL_STORAGE_KEYS } from "@/config/consts";

function* REQUEST_ORGANIZATION(action: SagaAction): Generator {
  yield call(runEffect, action, OrganizationEffects.requestOrganization);
}

function* SELECT_ORGANIZATION(action: SagaAction): Generator {
  // const urlParameter = {
  //   [URLParamsConstant.FARM_ID]: action.payload,
  // }
  // setURLParameters(urlParameter)

  yield call(
    setPreferenceValueInStorage,
    LOCAL_STORAGE_KEYS.organization,
    action.payload.organisationId
  );
}

export default function* rootSaga(): Generator {
  yield all([
    takeEvery(OrganizationActions.REQUEST_ORGANIZATION, REQUEST_ORGANIZATION),
    takeEvery(OrganizationActions.SELECT_ORGANIZATION, SELECT_ORGANIZATION),
  ]);
}

import { SagaAction } from "@/types/redux";
import { runEffect } from "@/utilities/actionUtility";
import { all, call, takeEvery } from "redux-saga/effects";
import OrganizationActions from "./actions";
import OrganizationEffects from "./effects";

function* REQUEST_ORGANIZATION(action: SagaAction): Generator {
  yield call(runEffect, action, OrganizationEffects.requestOrganization);
}

export default function* rootSaga(): Generator {
  yield all([
    takeEvery(OrganizationActions.REQUEST_ORGANIZATION, REQUEST_ORGANIZATION),
  ]);
}

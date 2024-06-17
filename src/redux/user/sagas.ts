import { takeEvery ,all, call} from "redux-saga/effects";
import UserActions from "./actions";
import { runEffect } from "@/utilities/actionUtility";
import UserEffects from "./effects";
import { SagaAction } from "@/types/redux";
import UserModel from "./models/createModels/userModel";
import removeEmpty from "@/utilities/objectUtility";

function* FETCH_USERS(action: SagaAction) {
   yield call(runEffect, action, UserEffects.getUsers);
}

function* CREATE_USER(action: SagaAction) {
  const user = new UserModel(action.payload);
  yield call(runEffect, action, UserEffects.createUser, removeEmpty(user.toJSON()));
}

export default function* userSaga() {
  yield all([
    takeEvery(UserActions.FETCH_USERS, FETCH_USERS),
    takeEvery(UserActions.CREATE_USER, CREATE_USER),
  ]);
}
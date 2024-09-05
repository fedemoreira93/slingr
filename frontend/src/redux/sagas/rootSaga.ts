import { all } from "redux-saga/effects";
import { watchTaskActions } from "./tasksSaga";

export default function* rootSaga() {
  yield all([watchTaskActions()]);
}

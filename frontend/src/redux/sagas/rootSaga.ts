import { all } from "redux-saga/effects";
import { watchDefaultActions } from "./defaultSaga";

export default function* rootSaga() {
  yield all([watchDefaultActions()]);
}

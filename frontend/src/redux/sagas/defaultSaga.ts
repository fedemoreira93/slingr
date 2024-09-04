// sagas.ts
import { put, takeEvery } from "redux-saga/effects";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@reducers/defaultSlice";

function* incrementSaga(action: ReturnType<typeof increment>) {
  yield put(increment(action.payload));
}

function* decrementSaga(action: ReturnType<typeof decrement>) {
  yield put(decrement(action.payload));
}

function* incrementByAmountSaga(action: ReturnType<typeof incrementByAmount>) {
  yield put(incrementByAmount(action.payload));
}

export function* watchDefaultActions() {
  yield takeEvery(increment.type, incrementSaga);
  yield takeEvery(decrement.type, decrementSaga);
  yield takeEvery(incrementByAmount.type, incrementByAmountSaga);
}

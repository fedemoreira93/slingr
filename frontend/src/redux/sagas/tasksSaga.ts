import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskEdit } from "@components/tasks/Tasks.types";
import {
  addTask,
  editTask,
  fetchTask,
  fetchTaskError,
  removeTask,
} from "@reducers/tasksSlice";

function* addTaskSaga(action: PayloadAction<Task>) {
  try {
    yield put(fetchTask());

    yield call(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });

    yield put(addTask(action.payload));
  } catch (error) {
    yield put(fetchTaskError(handleError(error)));
  }
}

function* removeTaskSaga(action: PayloadAction<number>) {
  try {
    yield put(fetchTask());

    yield call(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });

    yield put(removeTask(action.payload)); // Dispatch success action
  } catch (error) {
    yield put(fetchTaskError(handleError(error)));
  }
}

function* editTaskSaga(action: PayloadAction<TaskEdit>) {
  try {
    yield put(fetchTask());

    yield call(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });

    yield put(editTask(action.payload));
  } catch (error) {
    yield put(fetchTaskError(handleError(error)));
  }
}

const handleError = (error: unknown): string => {
  let message: string = "";
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  return message;
};

export function* watchTaskActions() {
  yield takeLatest(addTask.type, addTaskSaga);
  yield takeLatest(removeTask.type, removeTaskSaga);
  yield takeLatest(editTask.type, editTaskSaga);
}

export default watchTaskActions;

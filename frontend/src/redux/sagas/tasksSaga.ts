import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskEdit } from "@components/tasks/Tasks.types";
import {
  addTask,
  editTask,
  fetchTaskError,
  removeTask,
  setTasks,
  startLoading,
  stopLoading,
} from "@reducers/tasksSlice";

function* getTasksSaga() {
  try {
    yield put(startLoading());

    const tasks: Task[] = yield call(() => {
      return new Promise<Task[]>((resolve) => {
        setTimeout(() => {
          resolve([
            /*
            {
              id: 1,
              name: "Task 1",
              description: "Description 1",
              quantity: 1,
              purchased: false,
              deleted: false,
            },
            {
              id: 2,
              name: "Task 2",
              description: "Description 2",
              quantity: 0,
              purchased: false,
              deleted: false,
            },*/
          ]);
        }, 500);
      });
    });

    yield put(setTasks(tasks)); // Actualiza las tareas sin despachar `getTasks`
    yield put(stopLoading());
  } catch (error) {
    yield put(fetchTaskError(handleError(error)));
  }
}

function* addTaskSaga(action: PayloadAction<Task>) {
  try {
    yield put(startLoading());

    yield call(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 500);
        action.payload.id = 3;
      });
    });

    yield put(addTask(action.payload));
    yield put(stopLoading());
  } catch (error) {
    yield put(fetchTaskError(handleError(error)));
  }
}

function* removeTaskSaga(action: PayloadAction<number>) {
  try {
    yield put(startLoading());

    yield call(() => new Promise((resolve) => setTimeout(resolve, 500)));

    yield put(removeTask(action.payload));

    yield put(stopLoading());
  } catch (error) {
    yield put(fetchTaskError(handleError(error)));
  }
}

function* editTaskSaga(action: PayloadAction<TaskEdit>) {
  try {
    yield put(startLoading());

    yield call(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });

    yield put(editTask(action.payload));
    yield put(stopLoading());
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
  yield takeLatest("FETCH_TASKS_REQUEST", getTasksSaga);
  yield takeLatest("ADD_TASK_REQUEST", addTaskSaga);
  yield takeLatest("REMOVE_TASK_REQUEST", removeTaskSaga);
  yield takeLatest("EDIT_TASK_REQUEST", editTaskSaga);
}

export default watchTaskActions;

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
import {
  ADD_TASK_REQUEST,
  EDIT_TASK_REQUEST,
  FETCH_TASKS_REQUEST,
  REMOVE_TASK_REQUEST,
} from "@actionTypes/tasksTypes";

const fetchTasksAPI = (): Promise<Task[]> => {
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
};

const addTaskAPI = (task: Task): Promise<Task> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      task.id = 3;
      resolve(task);
    }, 500);
  });
};

const removeTaskAPI = (id: number): Promise<void> => {
  console.log(id);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

const editTaskAPI = (task: TaskEdit): Promise<Task> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const editedTask: Task = {
        id: 3,
        name: task.name || "no-fetch-name",
        description: task.name || "no-fetch-description",
        quantity: task.quantity || 0,
        purchased: task.purchased || false,
      };
      resolve(editedTask);
    }, 500);
  });
};

function* getTasksSaga() {
  try {
    yield put(startLoading());

    const tasks: Task[] = yield call(fetchTasksAPI);

    yield put(setTasks(tasks));
    yield put(stopLoading());
  } catch (error) {
    yield put(fetchTaskError(handleError(error)));
  }
}

function* addTaskSaga(action: PayloadAction<Task>) {
  try {
    yield put(startLoading());

    const newTask: Task = yield call(addTaskAPI, action.payload);

    yield put(addTask(newTask));
    yield put(stopLoading());
  } catch (error) {
    yield put(fetchTaskError(handleError(error)));
  }
}

function* removeTaskSaga(action: PayloadAction<number>) {
  try {
    yield put(startLoading());

    yield call(removeTaskAPI, action.payload);

    yield put(removeTask(action.payload));

    yield put(stopLoading());
  } catch (error) {
    yield put(fetchTaskError(handleError(error)));
  }
}

function* editTaskSaga(action: PayloadAction<TaskEdit>) {
  try {
    yield put(startLoading());

    const task: Task = yield call(editTaskAPI, action.payload);

    yield put(editTask(task));
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

  console.error(message, error);

  return message;
};

export function* watchTaskActions() {
  yield takeLatest(FETCH_TASKS_REQUEST, getTasksSaga);
  yield takeLatest(ADD_TASK_REQUEST, addTaskSaga);
  yield takeLatest(REMOVE_TASK_REQUEST, removeTaskSaga);
  yield takeLatest(EDIT_TASK_REQUEST, editTaskSaga);
}

export default watchTaskActions;

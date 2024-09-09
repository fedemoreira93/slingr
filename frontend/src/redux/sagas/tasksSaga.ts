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

const API_URL = "http://localhost:8080/tasks";

const fetchTasksAPI = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return await response.json();
};

const addTaskAPI = async (task: Task): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Failed to add task");
  }
  return await response.json();
};

const removeTaskAPI = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to remove task");
  }
};

const editTaskAPI = async (task: TaskEdit): Promise<Task> => {
  const response = await fetch(`${API_URL}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Failed to edit task");
  }
  return await response.json();
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

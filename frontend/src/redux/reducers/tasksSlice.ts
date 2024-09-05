import { Task, TaskEdit, TasksState } from "@components/tasks/Tasks.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTask: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTaskError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload];

      state.loading = false;
      state.error = null;
    },
    removeTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.deleted = true;
      }

      state.loading = false;
      state.error = null;
    },
    editTask: (state, action: PayloadAction<TaskEdit>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task && action.payload.name) {
        task.name = action.payload.name;
      }
    },
  },
});

export const { fetchTask, fetchTaskError, addTask, removeTask, editTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;

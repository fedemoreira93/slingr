import { Task, TaskEdit, TasksState } from "@components/tasks/Tasks.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TasksState = {
  tasks: [],
  loading: true,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    fetchTaskError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<TaskEdit>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload);
      }
    },
  },
});

export const {
  startLoading,
  stopLoading,
  fetchTaskError,
  setTasks,
  addTask,
  removeTask,
  editTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;

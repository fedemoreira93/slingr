import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DefaultState {
  count: number;
}

const initialState: DefaultState = {
  count: 0,
};

const defaultSlice = createSlice({
  name: "default",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = defaultSlice.actions;

export default defaultSlice.reducer;

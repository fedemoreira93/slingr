import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import defaultReducer from "@reducers/defaultSlice";
import rootSaga from "@sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    default: defaultReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

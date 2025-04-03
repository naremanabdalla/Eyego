// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tableReducer from "./slices/tableSlice";
import chartReducer from "./slices/chartSlice";
import uiReducer from "../redux/uiSlice"; // Add this import

const store = configureStore({
  reducer: {
    auth: authReducer,
    table: tableReducer,
    chart: chartReducer,
    ui: uiReducer, // Add this reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

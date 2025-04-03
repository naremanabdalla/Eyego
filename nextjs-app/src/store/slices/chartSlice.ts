// store/slices/chartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChartData {
  name: string;
  value: number;
}

interface ChartState {
  data: ChartData[];
  loading: boolean;
  error: string | null;
}

const initialState: ChartState = {
  data: [],
  loading: false,
  error: null,
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    fetchChartDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchChartDataSuccess(state, action: PayloadAction<ChartData[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchChartDataFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchChartDataStart,
  fetchChartDataSuccess,
  fetchChartDataFailure,
} = chartSlice.actions;
export default chartSlice.reducer;

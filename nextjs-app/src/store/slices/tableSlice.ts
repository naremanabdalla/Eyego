import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableState {
  data: any[];
  loading: boolean;
  error: string | null;
  sorting: {
    column: string;
    direction: 'asc' | 'desc';
  };
  filters: {
    [key: string]: string;
  };
  currentPage: number;
  itemsPerPage: number;
}

const initialState: TableState = {
  data: [],
  loading: false,
  error: null,
  sorting: {
    column: '',
    direction: 'asc',
  },
  filters: {},
  currentPage: 1,
  itemsPerPage: 10,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setSorting(state, action: PayloadAction<{ column: string; direction: 'asc' | 'desc' }>) {
      state.sorting = action.payload;
    },
    setFilters(state, action: PayloadAction<{ [key: string]: string }>) {
      state.filters = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  setSorting,
  setFilters,
  setCurrentPage,
  setItemsPerPage,
} = tableSlice.actions;

export const selectTableData = (state: { table: TableState }) => state.table.data;
export const selectTableLoading = (state: { table: TableState }) => state.table.loading;
export const selectTableError = (state: { table: TableState }) => state.table.error;
export const selectTableSorting = (state: { table: TableState }) => state.table.sorting;
export const selectTableFilters = (state: { table: TableState }) => state.table.filters;
export const selectCurrentPage = (state: { table: TableState }) => state.table.currentPage;
export const selectItemsPerPage = (state: { table: TableState }) => state.table.itemsPerPage;

export default tableSlice.reducer;
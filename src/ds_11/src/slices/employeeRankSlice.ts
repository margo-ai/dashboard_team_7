import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

import { employeeKoobName } from '../utils/constants';
import { TRequestParams } from '../utils/types';

type TRank = {
  rank: number;
  loadingStatus: string;
  loadingError: string;
};

const initialState: TRank = {
  rank: null,
  loadingStatus: 'idle',
  loadingError: null
};
export const fetchEmployeeRank = createAsyncThunk(
  'employeeRank/fetchEmployeeRank',
  async ({ dimensions, measures = [], filters, requestName }: TRequestParams) => {
    try {
      const data = await koobDataRequest3(
        employeeKoobName,
        dimensions,
        measures,
        filters,
        { schema_name: 'ds_11' },
        requestName
      );

      return data[0].course_rank;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }
);
const employeeRankSlice = createSlice({
  name: 'employeeRank',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEmployeeRank.pending, (state) => {
        state.loadingStatus = 'loading';
        state.rank = null;
      })
      .addCase(fetchEmployeeRank.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.rank = action.payload;
      })
      .addCase(fetchEmployeeRank.rejected, (state, action) => {
        state.loadingStatus = 'idle';
        state.rank = null;
        state.loadingError = action.error.message;
      })

      .addDefaultCase(() => {});
  }
});

const { reducer } = employeeRankSlice;

export default reducer;

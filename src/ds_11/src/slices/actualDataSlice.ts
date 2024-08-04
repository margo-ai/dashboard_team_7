import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KoobDataService } from 'bi-internal/services';
import { departmentKoobName } from '../utils/constants';
import { TRequestParams } from '../utils/types';
const { koobDataRequest3 } = KoobDataService;

type TActualData = {
  currentYearSkills: number;
  lastYearSkills: number;
  currentYearEmployees: number;
  lastYearEmployees: number;
};

const initialState: TActualData = {
  currentYearSkills: 0,
  lastYearSkills: 0,
  currentYearEmployees: 0,
  lastYearEmployees: 0
};

export const fetchCurrentYearSkills = createAsyncThunk(
  'actualData/fetchCurrentYearSkills',
  async ({ dimensions, measures = [], filters, requestName }: TRequestParams) => {
    try {
      const data = await koobDataRequest3(
        departmentKoobName,
        dimensions,
        measures,
        filters,
        { schema_name: 'ds_11' },
        requestName
      );

      return data[0].skill_id;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }
);

export const fetchLastYearSkills = createAsyncThunk(
  'actualData/fetchLastYearSkills',
  async ({ dimensions, measures = [], filters, requestName }: TRequestParams) => {
    try {
      const data = await koobDataRequest3(
        departmentKoobName,
        dimensions,
        measures,
        filters,
        { schema_name: 'ds_11' },
        requestName
      );

      return data[0].skill_id;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }
);

export const fetchCurrentYearEmployees = createAsyncThunk(
  'actualData/fetchCurrentYearEmployees',
  async ({ dimensions, measures = [], filters, requestName }: TRequestParams) => {
    try {
      const data = await koobDataRequest3(
        departmentKoobName,
        dimensions,
        measures,
        filters,
        { schema_name: 'ds_11' },
        requestName
      );

      return data[0].e_id;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }
);

export const fetchLastYearEmployees = createAsyncThunk(
  'actualData/fetchLastYearEmployees',
  async ({ dimensions, measures = [], filters, requestName }: TRequestParams) => {
    try {
      const data = await koobDataRequest3(
        departmentKoobName,
        dimensions,
        measures,
        filters,
        { schema_name: 'ds_11' },
        requestName
      );

      return data[0].e_id;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }
);

const actualDataSlice = createSlice({
  name: 'actualData',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentYearSkills.pending, (state) => {
        state.currentYearSkills = 0;
      })
      .addCase(fetchCurrentYearSkills.fulfilled, (state, action) => {
        state.currentYearSkills = action.payload;
      })
      .addCase(fetchCurrentYearSkills.rejected, (state) => {
        state.currentYearSkills = 0;
      })
      .addCase(fetchLastYearSkills.pending, (state) => {
        state.lastYearSkills = 0;
      })
      .addCase(fetchLastYearSkills.fulfilled, (state, action) => {
        state.lastYearSkills = action.payload;
      })
      .addCase(fetchLastYearSkills.rejected, (state) => {
        state.lastYearSkills = 0;
      })
      .addCase(fetchCurrentYearEmployees.pending, (state) => {
        state.currentYearEmployees = 0;
      })
      .addCase(fetchCurrentYearEmployees.fulfilled, (state, action) => {
        state.currentYearEmployees = action.payload;
      })
      .addCase(fetchCurrentYearEmployees.rejected, (state) => {
        state.currentYearEmployees = 0;
      })
      .addCase(fetchLastYearEmployees.pending, (state) => {
        state.lastYearEmployees = 0;
      })
      .addCase(fetchLastYearEmployees.fulfilled, (state, action) => {
        state.lastYearEmployees = action.payload;
      })
      .addCase(fetchLastYearEmployees.rejected, (state) => {
        state.lastYearEmployees = 0;
      })
      .addDefaultCase(() => {});
  }
});

const { reducer } = actualDataSlice;

export default reducer;

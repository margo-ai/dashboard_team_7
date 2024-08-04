import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KoobDataService } from 'bi-internal/services';
import { departmentKoobName } from '../utils/constants';
import { TAvgSkills, TRequestParams } from '../utils/types';
const { koobDataRequest3 } = KoobDataService;

type TAvgSkillsState = {
  avgSkillsWithCert: TAvgSkills;
  avgSkillsWithoutCert: TAvgSkills;
};

const initialState: TAvgSkillsState = {
  avgSkillsWithCert: [],
  avgSkillsWithoutCert: []
};

export const fetchAvgSkillsWithCert = createAsyncThunk(
  'avgSkills/avgSkillsWithCert',
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

      return data;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }
);

export const fetchAvgSkillsWithoutCert = createAsyncThunk(
  'avgSkills/avgSkillsWithoutCert',
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

      return data;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }
);

const avgSkillsSlice = createSlice({
  name: 'avgSkills',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAvgSkillsWithCert.pending, (state) => {
        state.avgSkillsWithCert = [];
      })
      .addCase(fetchAvgSkillsWithCert.fulfilled, (state, action) => {
        state.avgSkillsWithCert = action.payload;
      })
      .addCase(fetchAvgSkillsWithCert.rejected, (state) => {
        state.avgSkillsWithCert = [];
      })
      .addCase(fetchAvgSkillsWithoutCert.pending, (state) => {
        state.avgSkillsWithoutCert = [];
      })
      .addCase(fetchAvgSkillsWithoutCert.fulfilled, (state, action) => {
        state.avgSkillsWithoutCert = action.payload;
      })
      .addCase(fetchAvgSkillsWithoutCert.rejected, (state) => {
        state.avgSkillsWithoutCert = [];
      })
      .addDefaultCase(() => {});
  }
});

const { reducer } = avgSkillsSlice;

export default reducer;

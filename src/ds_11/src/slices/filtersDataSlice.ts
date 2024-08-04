import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;
import { departmentKoobName } from '../utils/constants';
import { TRequestParams } from '../utils/types';

type TFiltersData = {
  departments: { department: string }[];
  skillTypes: { skill_type: string }[];
  grades: { grade_name: string }[];
};

const initialState: TFiltersData = {
  departments: [],
  skillTypes: [],
  grades: []
};

export const fetchDepartments = createAsyncThunk(
  'filtersData/fetchDepartments',
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

export const fetchSkillTypes = createAsyncThunk(
  'filtersData/fetchSkillTypes',
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

export const fetchGrades = createAsyncThunk(
  'filtersData/fetchGrades',
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

const filtersDataSlice = createSlice({
  name: 'filtersData',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.departments = [];
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state) => {
        state.departments = [];
      })
      .addCase(fetchSkillTypes.pending, (state) => {
        state.skillTypes = [];
      })
      .addCase(fetchSkillTypes.fulfilled, (state, action) => {
        state.skillTypes = action.payload;
      })
      .addCase(fetchSkillTypes.rejected, (state) => {
        state.skillTypes = [];
      })
      .addCase(fetchGrades.pending, (state) => {
        state.grades = [];
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.grades = action.payload;
      })
      .addCase(fetchGrades.rejected, (state) => {
        state.grades = [];
      })
      .addDefaultCase(() => {});
  }
});

const { reducer } = filtersDataSlice;

export default reducer;

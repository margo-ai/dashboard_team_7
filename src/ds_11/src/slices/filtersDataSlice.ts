import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;
import { departmentKoobName } from '../utils/constants';
import { TRequestParams } from '../utils/types';

type TFiltersData = {
  departments: { department: string }[];
  departmentsError: string;
  skillTypes: { skill_type: string }[];
  skillTypesError: string;
  grades: { grade_name: string }[];
  gradesError: string;
};

const initialState: TFiltersData = {
  departments: [],
  departmentsError: null,
  skillTypes: [],
  skillTypesError: null,
  grades: [],
  gradesError: null
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
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.departments = [];
        state.departmentsError = action.error.message;
      })
      .addCase(fetchSkillTypes.pending, (state) => {
        state.skillTypes = [];
      })
      .addCase(fetchSkillTypes.fulfilled, (state, action) => {
        state.skillTypes = action.payload;
      })
      .addCase(fetchSkillTypes.rejected, (state, action) => {
        state.skillTypes = [];
        state.skillTypesError = action.error.message;
      })
      .addCase(fetchGrades.pending, (state) => {
        state.grades = [];
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.grades = action.payload;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.grades = [];
        state.gradesError = action.error.message;
      })
      .addDefaultCase(() => {});
  }
});

const { reducer } = filtersDataSlice;

export default reducer;

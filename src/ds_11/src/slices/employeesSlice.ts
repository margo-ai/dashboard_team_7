import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;
import { TMappedData, TRequestParams } from '../utils/types';
import { employeeKoobName } from '../utils/constants';
import { mapEmployeeData } from '../utils/helpers';

type TEmployees = {
  employeeData: TMappedData;
  employeeLoadingStatus: string;
  employeeDataError: string;
  comparisonEmployeeData: TMappedData;
  comparisonEmployeeLoadingStatus: string;
  comparisonEmployeeDataError: string;
};

const initialState: TEmployees = {
  employeeData: [],
  employeeLoadingStatus: 'idle',
  employeeDataError: null,
  comparisonEmployeeData: [],
  comparisonEmployeeLoadingStatus: 'idle',
  comparisonEmployeeDataError: null
};

export const fetchMainEmployee = createAsyncThunk(
  'employees/fetchMainEmployee',
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

      const mappedData = mapEmployeeData(data);

      return mappedData;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }
);

export const fetchComparisonEmployee = createAsyncThunk(
  'employees/fetchComparisonEmployee',
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

      const mappedData = mapEmployeeData(data);

      return mappedData;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployeeData: (state, action) => {
      state.employeeData = action.payload;
    },
    setComparisonEmployeeData: (state, action) => {
      state.comparisonEmployeeData = action.payload;
    },
    setEmployeeDataError: (state, action) => {
      state.employeeDataError = action.payload;
    },
    setComparisonEmployeeDataError: (state, action) => {
      state.comparisonEmployeeDataError = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMainEmployee.pending, (state) => {
        state.employeeLoadingStatus = 'loading';
        state.employeeDataError = null;
        state.employeeData = [];
      })
      .addCase(fetchMainEmployee.fulfilled, (state, action) => {
        state.employeeLoadingStatus = 'idle';
        if (action.payload.length === 0) {
          state.employeeDataError = 'Сотрудник не найден';
        } else {
          state.employeeDataError = null;
          state.employeeData = action.payload;
        }
      })
      .addCase(fetchMainEmployee.rejected, (state, action) => {
        state.employeeLoadingStatus = 'idle';
        state.employeeData = [];
        state.employeeDataError = action.error.message;
      })
      .addCase(fetchComparisonEmployee.pending, (state) => {
        state.comparisonEmployeeLoadingStatus = 'loading';
        state.comparisonEmployeeDataError = null;
        state.comparisonEmployeeData = [];
      })
      .addCase(fetchComparisonEmployee.fulfilled, (state, action) => {
        state.comparisonEmployeeLoadingStatus = 'idle';
        if (action.payload.length === 0) {
          state.comparisonEmployeeDataError = 'Сотрудник не найден';
        } else {
          state.comparisonEmployeeDataError = null;
          state.comparisonEmployeeData = action.payload;
        }
      })
      .addCase(fetchComparisonEmployee.rejected, (state, action) => {
        state.comparisonEmployeeLoadingStatus = 'idle';
        state.comparisonEmployeeData = [];
        state.comparisonEmployeeDataError = action.error.message;
      })

      .addDefaultCase(() => {});
  }
});

const { actions, reducer } = employeesSlice;
export const { setEmployeeData, setComparisonEmployeeData, setEmployeeDataError, setComparisonEmployeeDataError } =
  actions;

export default reducer;

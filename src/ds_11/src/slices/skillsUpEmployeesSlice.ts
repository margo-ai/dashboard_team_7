import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KoobDataService } from 'bi-internal/services';
import { departmentKoobName } from '../utils/constants';
import { TRequestParams, TSkillsUpEmployeesWithCert, TSkillsUpEmployeesWithoutCert } from '../utils/types';
const { koobDataRequest3 } = KoobDataService;

type TSkillsUpEmployees = {
  haveCertEmployees: TSkillsUpEmployeesWithCert;
  haventCertEmployees: TSkillsUpEmployeesWithoutCert;
};

const initialState: TSkillsUpEmployees = {
  haveCertEmployees: [],
  haventCertEmployees: []
};

export const fetchSkillsUpEmployeesWithCert = createAsyncThunk(
  'skillsUpEmployees/skillsUpEmployeesWithCert',
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

export const fetchSkillsUpEmployeesWithoutCert = createAsyncThunk(
  'skillsUpEmployees/skillsUpEmployeesWithoutCert',
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

const skillsUpEmployeesSlice = createSlice({
  name: 'skillsUpEmployees',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSkillsUpEmployeesWithCert.pending, (state) => {
        state.haveCertEmployees = [];
      })
      .addCase(fetchSkillsUpEmployeesWithCert.fulfilled, (state, action) => {
        state.haveCertEmployees = action.payload;
      })
      .addCase(fetchSkillsUpEmployeesWithCert.rejected, (state) => {
        state.haveCertEmployees = [];
      })
      .addCase(fetchSkillsUpEmployeesWithoutCert.pending, (state) => {
        state.haventCertEmployees = [];
      })
      .addCase(fetchSkillsUpEmployeesWithoutCert.fulfilled, (state, action) => {
        state.haventCertEmployees = action.payload;
      })
      .addCase(fetchSkillsUpEmployeesWithoutCert.rejected, (state) => {
        state.haventCertEmployees = [];
      })
      .addDefaultCase(() => {});
  }
});

const { reducer } = skillsUpEmployeesSlice;

export default reducer;

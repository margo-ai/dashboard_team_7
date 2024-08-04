import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KoobDataService } from 'bi-internal/services';
import { departmentKoobName } from '../utils/constants';
import { TRequestParams } from '../utils/types';
const { koobDataRequest3 } = KoobDataService;

type TLowestSkills = {
  skillIds: number[];
  lowestSkillsData: { skill_id: number; skill_name: string; grade_name: string; e_id: number; sort: number }[];
};

const initialState: TLowestSkills = {
  skillIds: [],
  lowestSkillsData: []
};

export const fetchSkillsIds = createAsyncThunk(
  'lowestSkills/fetchSkillsIds',
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

      const skillsArray = data.filter((item) => item.sort !== 0);

      skillsArray.sort((a, b) => {
        const item_a = a.sort;
        const item_b = b.sort;
        return item_a - item_b;
      });

      const skillsIds = skillsArray.slice(0, 5).map((item) => item.skill_id);

      return skillsIds;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }
);

export const fetchLowestSkillsData = createAsyncThunk(
  'lowestSkills/fetchLowestSkillsData',
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

const lowestSkillsSlice = createSlice({
  name: 'lowestSkills',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSkillsIds.pending, (state) => {
        state.skillIds = [];
      })
      .addCase(fetchSkillsIds.fulfilled, (state, action) => {
        state.skillIds = action.payload;
      })
      .addCase(fetchSkillsIds.rejected, (state) => {
        state.skillIds = [];
      })
      .addCase(fetchLowestSkillsData.pending, (state) => {
        state.lowestSkillsData = [];
      })
      .addCase(fetchLowestSkillsData.fulfilled, (state, action) => {
        state.lowestSkillsData = action.payload;
      })
      .addCase(fetchLowestSkillsData.rejected, (state) => {
        state.lowestSkillsData = [];
      })
      .addDefaultCase(() => {});
  }
});

const { reducer } = lowestSkillsSlice;

export default reducer;

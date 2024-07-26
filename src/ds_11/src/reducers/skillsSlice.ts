import { createSlice } from '@reduxjs/toolkit';

type TSkillsData = {
  skillType: string;
  data: {
    sort: number;
    skill: string;
    grade: string;
  }[];
};

type TSstate = {
  mainEmployeeSkills: TSkillsData[];
  comparisonEmployeeSkills: TSkillsData[];
};

const initialState: TSstate = {
  mainEmployeeSkills: [],
  comparisonEmployeeSkills: []
};

const filtersSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setEmployeeSkills: (state, action) => {
      state.mainEmployeeSkills = action.payload;
    },
    setComparisonEmployeeSkills: (state, action) => {
      state.comparisonEmployeeSkills = action.payload;
    }
  }
});

const { actions, reducer } = filtersSlice;
export const { setEmployeeSkills, setComparisonEmployeeSkills } = actions;

export default reducer;

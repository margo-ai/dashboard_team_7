import { createSlice } from '@reduxjs/toolkit';

type TFiltersOptions = {
  department: { name: string; value: string }[];
  skillType: { name: string; value: string }[];
  grade: { name: string; value: string }[];
};

const initialState: TFiltersOptions = {
  department: [],
  skillType: [],
  grade: []
};

const filtersSlice = createSlice({
  name: 'filtersOptions',
  initialState,
  reducers: {
    setDepartmentOptions: (state, action) => {
      state.department = action.payload;
    },
    setSkillTypeOptions: (state, action) => {
      state.skillType = action.payload;
    },
    setGradeOptions: (state, action) => {
      state.grade = action.payload;
    }
  }
});

const { actions, reducer } = filtersSlice;
export const { setDepartmentOptions, setSkillTypeOptions, setGradeOptions } = actions;

export default reducer;

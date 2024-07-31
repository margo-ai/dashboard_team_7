import { createSlice } from '@reduxjs/toolkit';

type TFilters = {
  department: string;
  skillType: string;
  year: number;
  grade: string;
};

const initialState: TFilters = {
  department: 'Все подразделения',
  skillType: 'Все типы навыков',
  year: 2022,
  grade: 'Все грейды'
};

const filtersSlice = createSlice({
  name: 'currentFilters',
  initialState,
  reducers: {
    setDeptFilter: (state, action) => {
      state.department = action.payload;
    },
    setSkillTypeFilter: (state, action) => {
      state.skillType = action.payload;
    },
    setYearFilter: (state, action) => {
      state.year = action.payload;
    },
    setGradeFilter: (state, action) => {
      state.grade = action.payload;
    }
  }
});

const { actions, reducer } = filtersSlice;
export const { setDeptFilter, setSkillTypeFilter, setYearFilter, setGradeFilter } = actions;

export default reducer;

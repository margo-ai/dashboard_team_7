import { createSlice } from '@reduxjs/toolkit';

type TFilters = {
  frc: string;
  skillsType: string;
  year: number;
};

const initialState: TFilters = {
  frc: 'Все подразделения',
  skillsType: 'Все типы навыков',
  year: 2022
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFrcFilter: (state, action) => {
      state.frc = action.payload;
    },
    setSkillsTypeFilter: (state, action) => {
      state.skillsType = action.payload;
    },
    setYearFilter: (state, action) => {
      state.year = action.payload;
    }
  }
});

const { actions, reducer } = filtersSlice;
export const { setFrcFilter, setSkillsTypeFilter, setYearFilter } = actions;

export default reducer;

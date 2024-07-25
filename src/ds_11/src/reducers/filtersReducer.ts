import { createSlice } from '@reduxjs/toolkit';

type TFilters = {
  position: string;
  frc: string;
  skillsType: string;
};

const initialState: TFilters = {
  position: 'Все должности',
  frc: 'Все подразделения',
  skillsType: 'Все типы навыков'
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPositionFilter: (state, action) => {
      state.position = action.payload;
    },
    setFrcFilter: (state, action) => {
      state.frc = action.payload;
    },
    setSkillsTypeFilter: (state, action) => {
      state.skillsType = action.payload;
    }
  }
});

const { actions, reducer } = filtersSlice;
export const { setFrcFilter, setPositionFilter, setSkillsTypeFilter } = actions;

export default reducer;

import { createSlice } from '@reduxjs/toolkit';

type TSstate = {
  skills: {
    skillType: string;
    data: {
      sort: number;
      skill: string;
      grade: string;
    }[];
  }[];
};

const initialState: TSstate = {
  skills: []
};

const filtersSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setEmployeeSkills: (state, action) => {
      state.skills = action.payload;
    }
  }
});

const { actions, reducer } = filtersSlice;
export const { setEmployeeSkills } = actions;

export default reducer;

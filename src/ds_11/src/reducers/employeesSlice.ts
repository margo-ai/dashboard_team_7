import { createSlice } from '@reduxjs/toolkit';

type TEmployee = {
  department: string;
  email: string;
  gradeLevelEexp: string;
  name: string;
  position: string;
  skill: string;
  skillDetail: string;
  sort: number;
  employeeId: number;
}[];

type TState = {
  employeeData: TEmployee;
  comparisonEmployeeData: TEmployee;
};

const initialState: TState = {
  employeeData: [],
  comparisonEmployeeData: []
};

const filtersSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployeeData: (state, action) => {
      state.employeeData = action.payload;
    },
    setComparisonEmployeeData: (state, action) => {
      state.comparisonEmployeeData = action.payload;
    }
  }
});

const { actions, reducer } = filtersSlice;
export const { setEmployeeData, setComparisonEmployeeData } = actions;

export default reducer;

import { configureStore } from '@reduxjs/toolkit';

import employees from './slices/employeesSlice';
import currentFilters from './slices/currentFiltersReducer';
import skills from './slices/skillsSlice';
import comparisonFilters from './slices/comparisonFiltersSlice';
import filtersOptions from './slices/filtersOptionsSlice';
import filtersData from './slices/filtersDataSlice';
import lowestSkills from './slices/lowestSkillsSlice';
import skillsUpEmployees from './slices/skillsUpEmployeesSlice';
import avgSkills from './slices/avgSkillsSlice';
import actualData from './slices/actualDataSlice';
import employeeRank from './slices/employeeRankSlice';

const store = configureStore({
  reducer: {
    employees,
    currentFilters,
    skills,
    comparisonFilters,
    filtersOptions,
    filtersData,
    lowestSkills,
    skillsUpEmployees,
    avgSkills,
    actualData,
    employeeRank
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

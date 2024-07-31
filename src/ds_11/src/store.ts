import { configureStore } from '@reduxjs/toolkit';

import employee from './reducers/employeesSlice';
import currentFilters from './reducers/currentFiltersReducer';
import skills from './reducers/skillsSlice';
import comparisonFilters from './reducers/comparisonFiltersSlice';
import filtersOptions from './reducers/filtersOptionsSlice';

const store = configureStore({
  reducer: { employee, currentFilters, skills, comparisonFilters, filtersOptions },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

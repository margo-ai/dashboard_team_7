import { configureStore } from '@reduxjs/toolkit';

import employee from './reducers/employeesSlice';
import filters from './reducers/filtersReducer';
import skills from './reducers/skillsSlice';
import comparisonFilters from './reducers/comparisonFiltersSlice';

const store = configureStore({
  reducer: { employee, filters, skills, comparisonFilters },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

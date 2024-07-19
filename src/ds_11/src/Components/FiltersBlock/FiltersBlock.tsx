import React from 'react';

import './filtersBlock.scss';
import { PeriodFilter } from '../PeriodFilter/PeriodFilter';
import { SeniorityFilter } from '../SeniorityFilter/SeniorityFilter';
import { SelectFilters } from '../SelectFilters/SelectFilters';
import { SelectFiltersBlock } from '../SelectFiltersBlock/SelectFiltersBlock';
import { ResetFiltersButton } from '../ResetFiltersButton/ResetFiltersButton';

export const FiltersBlock = () => {
  return (
    <div className="filtersBlock">
      <PeriodFilter />
      <SeniorityFilter />
      <SelectFiltersBlock>
        <SelectFilters />
        <SelectFilters />
        <SelectFilters />
      </SelectFiltersBlock>
      <ResetFiltersButton />
    </div>
  );
};

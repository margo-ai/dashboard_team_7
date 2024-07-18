import React from 'react';

import './filtersBlock.scss';
import { PeriodFilter } from '../PeriodFilter/PeriodFilter';
import { SeniorityFilter } from '../SeniorityFilter/SeniorityFilter';

export const FiltersBlock = () => {
  return (
    <div className="filtersBlock">
      <PeriodFilter />
      <SeniorityFilter />
    </div>
  );
};

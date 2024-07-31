import React, { useEffect, useState } from 'react';

import './filtersBlock.scss';
import { PeriodFilter } from '../PeriodFilter/PeriodFilter';
import { SeniorityFilter } from '../SeniorityFilter/SeniorityFilter';
import { SelectFilters } from '../SelectFilters/SelectFilters';
import { SelectFiltersBlock } from '../SelectFiltersBlock/SelectFiltersBlock';
import { ResetFiltersButton } from '../ui/ResetFiltersButton/ResetFiltersButton';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import { setYearFilter, setSkillTypeFilter, setDeptFilter, setGradeFilter } from '../../reducers/currentFiltersReducer';

export const FiltersBlock = () => {
  const [year, setYear] = useState(new Date('2022-01-01'));

  const skillTypeOptions = useAppSelector((state) => state.filtersOptions.skillType);
  const departmentOptions = useAppSelector((state) => state.filtersOptions.department);

  const currentDepartmentFilter = useAppSelector((state) => state.currentFilters.department);
  const currentSkillTypeFilter = useAppSelector((state) => state.currentFilters.skillType);

  const dispatch = useAppDispatch();

  const handleResetButton = () => {
    setYear(new Date('2022-01-01'));

    dispatch(setYearFilter(2022));
    dispatch(setDeptFilter('Все подразделения'));
    dispatch(setSkillTypeFilter('Все типы навыков'));
    dispatch(setGradeFilter('Все грейды'));
  };

  return (
    <div className="filtersBlock">
      <PeriodFilter year={year} setYear={setYear} />
      <SeniorityFilter />
      {skillTypeOptions.length !== 0 && departmentOptions.length !== 0 && (
        <SelectFiltersBlock>
          <SelectFilters
            options={departmentOptions}
            setSelectedFilter={setDeptFilter}
            selectedFilter={currentDepartmentFilter}
          />
          <SelectFilters
            options={skillTypeOptions}
            setSelectedFilter={setSkillTypeFilter}
            selectedFilter={currentSkillTypeFilter}
          />
        </SelectFiltersBlock>
      )}
      <ResetFiltersButton resetFunc={handleResetButton} />
    </div>
  );
};

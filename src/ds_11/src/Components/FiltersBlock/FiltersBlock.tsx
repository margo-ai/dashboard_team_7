import React, { useEffect, useState } from 'react';

import './filtersBlock.scss';
import { PeriodFilter } from '../PeriodFilter/PeriodFilter';
import { SeniorityFilter } from '../SeniorityFilter/SeniorityFilter';
import { SelectFilters } from '../SelectFilters/SelectFilters';
import { SelectFiltersBlock } from '../SelectFiltersBlock/SelectFiltersBlock';
import { ResetFiltersButton } from '../ui/ResetFiltersButton/ResetFiltersButton';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import { setYearFilter, setFrcFilter, setSkillsTypeFilter } from '../../reducers/filtersReducer';

export const FiltersBlock = () => {
  const [year, setYear] = useState(new Date('2022-01-01'));

  const department = useAppSelector((state) => state.filters.frc);
  const skillsType = useAppSelector((state) => state.filters.skillsType);

  const dispatch = useAppDispatch();

  const departments = [
    { name: 'Все подразделения', value: 'all' },
    { name: 'Отдел1', value: 'first' },
    { name: 'Отдел2', value: 'second' },
    { name: 'Отдел3', value: 'third' }
  ];

  const skillsTypes = [
    { name: 'Все типы навыков', value: 'all' },
    { name: 'Навыки1', value: 'first' },
    { name: 'Навыки2', value: 'second' },
    { name: 'Навыки3', value: 'third' }
  ];

  // useEffect(() => {
  //   console.log({ position }, { department }, { skillsType });
  // }, [position, department, skillsType]);

  const handleResetButton = () => {
    dispatch(setYearFilter(2022));
    setYear(new Date('2022-01-01'));
  };

  return (
    <div className="filtersBlock">
      <PeriodFilter year={year} setYear={setYear} />
      <SeniorityFilter />
      <SelectFiltersBlock>
        <SelectFilters options={departments} setSelectedFilter={setFrcFilter} />
        <SelectFilters options={skillsTypes} setSelectedFilter={setSkillsTypeFilter} />
      </SelectFiltersBlock>
      <ResetFiltersButton resetFunc={handleResetButton} />
    </div>
  );
};

import React, { useEffect } from 'react';

import './filtersBlock.scss';
import { PeriodFilter } from '../PeriodFilter/PeriodFilter';
import { SeniorityFilter } from '../SeniorityFilter/SeniorityFilter';
import { SelectFilters } from '../SelectFilters/SelectFilters';
import { SelectFiltersBlock } from '../SelectFiltersBlock/SelectFiltersBlock';
import { ResetFiltersButton } from '../ResetFiltersButton/ResetFiltersButton';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import { setPositionFilter, setFrcFilter, setSkillsTypeFilter } from '../../reducers/filtersReducer';

export const FiltersBlock = () => {
  const position = useAppSelector((state) => state.filters.position);
  const department = useAppSelector((state) => state.filters.frc);
  const skillsType = useAppSelector((state) => state.filters.skillsType);

  const positions = [
    { name: 'Все должности', value: 'all' },
    { name: 'Должность1', value: 'first' },
    { name: 'Должность2', value: 'second' },
    { name: 'Должность3', value: 'third' }
  ];

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

  return (
    <div className="filtersBlock">
      <PeriodFilter />
      <SeniorityFilter />
      <SelectFiltersBlock>
        <SelectFilters options={positions} setSelectedFilter={setPositionFilter} />
        <SelectFilters options={departments} setSelectedFilter={setFrcFilter} />
        <SelectFilters options={skillsTypes} setSelectedFilter={setSkillsTypeFilter} />
      </SelectFiltersBlock>
      <ResetFiltersButton />
    </div>
  );
};

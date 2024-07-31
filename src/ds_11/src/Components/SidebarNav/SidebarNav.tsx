import React from 'react';
import { UrlState } from 'bi-internal/core';

import { DepartmentIcon } from '../ui/iconsComponents/DepartmentIcon/DepartmentIcon';
import { EmployeeIcon } from '../ui/iconsComponents/EmployeeIcon/EmployeeIcon';
import { navigateToDboard } from '../../utils/helpers';

import { setEmployeeData, setComparisonEmployeeData } from '../../reducers/employeesSlice';
import { useAppDispatch } from '../../utils/hooks';

import './sidebarNav.scss';

export const SidebarNav = () => {
  const stateCharts = UrlState.getModel();
  const { dboard } = stateCharts;

  const dispatch = useAppDispatch();

  const handleClickOnFirstDboard = () => {
    navigateToDboard('1');
    dispatch(setEmployeeData([]));
    dispatch(setComparisonEmployeeData([]));
  };

  return (
    <nav className="sidebarNav">
      <ul>
        <li>
          <button
            style={{ borderLeft: `${dboard === '1' ? '7px solid #05C696' : ''}` }}
            onClick={handleClickOnFirstDboard}
          >
            <DepartmentIcon />
          </button>
        </li>
        <li>
          <button
            style={{ borderLeft: `${dboard === '2' ? '7px solid #05C696' : ''}` }}
            onClick={() => navigateToDboard('2')}
          >
            <EmployeeIcon />
          </button>
        </li>
      </ul>
    </nav>
  );
};

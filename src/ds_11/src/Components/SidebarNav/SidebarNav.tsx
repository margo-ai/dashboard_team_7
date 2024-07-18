import React from 'react';
import { NavLink } from 'react-router-dom';

import './sidebarNav.scss';
import { DepartmentIcon } from '../ui/DepartmentIcon/DepartmentIcon';
import { EmployeeIcon } from '../ui/EmployeeIcon/EmployeeIcon';

export const SidebarNav = () => {
  return (
    <nav id="sidebarNav">
      <ul>
        <NavLink to="/department">
          <li>
            <DepartmentIcon />
          </li>
        </NavLink>
        <NavLink to="/employee">
          <li>
            <EmployeeIcon />
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

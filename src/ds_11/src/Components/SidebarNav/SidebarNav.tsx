import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './sidebarNav.scss';
import { DepartmentIcon } from '../ui/DepartmentIcon/DepartmentIcon';
import { EmployeeIcon } from '../ui/EmployeeIcon/EmployeeIcon';

export const SidebarNav = () => {
  return (
    <nav id="sidebarNav">
      <ul>
        <Link to="?dboard=1">
          <li>
            <DepartmentIcon />
          </li>
        </Link>
        <Link to="?dboard=2">
          <li>
            <EmployeeIcon />
          </li>
        </Link>
      </ul>
    </nav>
  );
};

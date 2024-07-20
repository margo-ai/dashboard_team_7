import React from 'react';

import './employeeInfoTitle.scss';
import { EmployeeTitleIcon } from '../ui/EmployeeTitleIcon/EmployeeTitleIcon';

type Props = {
  title: string;
  width: number;
  children: React.ReactNode;
};

export const EmployeeInfoTitle = ({ title, width, children }: Props) => {
  return (
    <div className="employeeTitle" style={{ width: `${width}px` }}>
      <div className="employeeTitle__icon">{children}</div>
      <h2>{title}</h2>
    </div>
  );
};

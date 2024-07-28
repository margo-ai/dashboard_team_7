import React from 'react';

import './employeeInfoTitle.scss';

type Props = {
  title: string;
  width: number;
  children: React.ReactNode;
};

export const EmployeeInfoTitle = ({ title, width, children }: Props) => {
  return (
    <div className="employeeTitle" style={{ maxWidth: `${width}px` }}>
      <div className={`${title === 'Сравнение сотрудников' ? 'employeeTitle__icon icon-wide' : 'employeeTitle__icon'}`}>
        {children}
      </div>
      <h2>{title}</h2>
    </div>
  );
};

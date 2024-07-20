import React from 'react';

import { EmployeeBlock } from '../../Components/EmployeeBlock/EmployeeBlock';

import './emloyeePage.scss';

export const EmployeePage = () => {
  return (
    <div className="employeePage">
      <h1 style={{ display: 'none' }}>Страница сотрудника</h1>
      <EmployeeBlock />
    </div>
  );
};

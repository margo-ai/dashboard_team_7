import React from 'react';

import { EmployeeSection } from '../../Components/EmployeePage/EmployeeSection/EmployeeSection';
import { ComparisonSection } from '../../Components/EmployeePage/ComparisonSection/ComparisonSection';
import { SkillsSection } from '../../Components/EmployeePage/SkillsSection/SkillsSection';

import { useAppSelector } from '../../utils/hooks';

import './emloyeePage.scss';

export const EmployeePage = () => {
  const employeeData = useAppSelector((state) => state.employee.employeeData);

  return (
    <div className="employeePage">
      <h1 style={{ display: 'none' }}>Страница сотрудника</h1>
      <EmployeeSection />
      <ComparisonSection />
      <SkillsSection />
    </div>
  );
};

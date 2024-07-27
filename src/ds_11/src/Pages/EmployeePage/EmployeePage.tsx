import React from 'react';

import { EmployeeSection } from '../../Components/EmployeeSection/EmployeeSection';

import './emloyeePage.scss';
import { ComparisonSection } from '../../Components/ComparisonSection/ComparisonSection';
import { SkillsSection } from '../../Components/SkillsSection/SkillsSection';
import { useAppSelector } from '../../utils/hooks';

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

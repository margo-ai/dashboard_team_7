import React from 'react';

import { EmployeeSection } from '../../Components/EmployeePage/EmployeeSection';
import { ComparisonSection } from '../../Components/EmployeePage/ComparisonSection';
import { SkillsSection } from '../../Components/EmployeePage/SkillsSection';

import './emloyeePage.scss';

export const EmployeePage = () => {
  return (
    <div className="employeePage">
      <h1 style={{ display: 'none' }}>Страница сотрудника</h1>
      <EmployeeSection />
      <ComparisonSection />
      <SkillsSection />
    </div>
  );
};

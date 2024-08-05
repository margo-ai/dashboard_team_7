import React from 'react';

import { EmployeeInfoTitle } from '../EmployeeInfoTitle';
import { ComparisonTitleIcon } from '../../ui/iconsComponents/ComparisonTitleIcon';
import { EmployeesComparisonBlock } from '../EmployeesComparisonBlock';

import { useAppSelector } from '../../../utils/hooks';

import './comparisonSection.scss';

export const ComparisonSection = () => {
  const employeeData = useAppSelector((state) => state.employees.employeeData);

  return (
    <section className="comparisonSection" style={{ display: `${employeeData.length !== 0 ? 'block' : 'none'}` }}>
      <EmployeeInfoTitle title="Сравнение сотрудников" width={447}>
        <ComparisonTitleIcon />
      </EmployeeInfoTitle>
      <EmployeesComparisonBlock />
    </section>
  );
};

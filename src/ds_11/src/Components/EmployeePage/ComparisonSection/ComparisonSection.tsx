import React from 'react';

import { EmployeeInfoTitle } from '../EmployeeInfoTitle/EmployeeInfoTitle';
import { ComparisonTitleIcon } from '../../ui/iconsComponents/ComparisonTitleIcon/ComparisonTitleIcon';
import { EmployeesComparisonBlock } from '../EmployeesComparisonBlock/EmployeesComparisonBlock';

import './comparisonSection.scss';
import { useAppSelector } from '../../../utils/hooks';

export const ComparisonSection = () => {
  const employeeData = useAppSelector((state) => state.employee.employeeData);

  return (
    <section className="comparisonSection" style={{ display: `${employeeData.length !== 0 ? 'block' : 'none'}` }}>
      <EmployeeInfoTitle title="Сравнение сотрудников" width={447}>
        <ComparisonTitleIcon />
      </EmployeeInfoTitle>
      <EmployeesComparisonBlock />
    </section>
  );
};

import React from 'react';

import { EmployeeInfoTitle } from '../EmployeeInfoTitle/EmployeeInfoTitle';
import { ComparisonTitleIcon } from '../ui/iconsComponents/ComparisonTitleIcon/ComparisonTitleIcon';
import { EmployeesComparisonBlock } from '../EmployeesComparisonBlock/EmployeesComparisonBlock';

import './comparisonSection.scss';
import { useAppSelector } from '../../utils/hooks';

export const ComparisonSection = () => {
  const skillsData = useAppSelector((state) => state.skills.skills);

  return (
    <section className="comparisonSection">
      <EmployeeInfoTitle title="Сравнение сотрудников" width={447}>
        <ComparisonTitleIcon />
      </EmployeeInfoTitle>
      <EmployeesComparisonBlock />
    </section>
  );
};
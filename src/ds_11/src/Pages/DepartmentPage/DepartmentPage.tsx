import React from 'react';

import './departmentPage.scss';
import { FiltersBlock } from '../../Components/FiltersBlock/FiltersBlock';
import { MainDepartmentSection } from '../../Components/MainDepartmentSection/MainDepartmentSection';
import { DynamicChartsSection } from '../../Components/DynamicChartsSection/DynamicChartsSection';

export const DepartmentPage = () => {
  return (
    <main className="departmentPage">
      <h1 style={{ display: 'none' }}>Страница департамента</h1>
      <FiltersBlock />
      <MainDepartmentSection />
      {/* <DynamicChartsSection /> */}
    </main>
  );
};

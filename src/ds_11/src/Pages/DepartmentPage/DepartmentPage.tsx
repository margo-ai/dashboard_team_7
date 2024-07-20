import React from 'react';

import './departmentPage.scss';
import { FiltersBlock } from '../../Components/FiltersBlock/FiltersBlock';
import { MainDepartmentBlock } from '../../Components/MainDepartmentBlock/MainDepartmentBlock';

export const DepartmentPage = () => {
  return (
    <main className="departmentPage">
      <h1 style={{ display: 'none' }}>Страница департамента</h1>
      <FiltersBlock />
      <MainDepartmentBlock />
    </main>
  );
};

import React, { useEffect } from 'react';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

import './departmentPage.scss';
import { FiltersBlock } from '../../Components/FiltersBlock/FiltersBlock';
import { MainDepartmentSection } from '../../Components/MainDepartmentSection/MainDepartmentSection';
import { DynamicChartsSection } from '../../Components/DynamicChartsSection/DynamicChartsSection';
import { getSelectOptionsFromFiltersData } from '../../utils/helpers';

import { setDepartmentOptions, setSkillTypeOptions, setGradeOptions } from '../../reducers/filtersOptionsSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
export const DepartmentPage = () => {
  const dispatch = useAppDispatch();

  const currentYear = useAppSelector((state) => state.currentFilters.year);

  useEffect(() => {
    koobDataRequest3(
      'etl_db_7.department_koob',
      ['department'],
      [],
      {
        y: ['=', currentYear],
        data_type: ['=', 'актуальные']
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      const departmentOptions = getSelectOptionsFromFiltersData(res, 'department');
      console.log({ deptOpt: res });

      dispatch(setDepartmentOptions(departmentOptions));
    });

    koobDataRequest3(
      'etl_db_7.department_koob',
      ['skill_type'],
      [],
      {
        y: ['=', currentYear],
        data_type: ['=', 'актуальные']
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      const skillTypeOptions = getSelectOptionsFromFiltersData(res, 'skillType');
      console.log({ skillsOPt: res });
      dispatch(setSkillTypeOptions(skillTypeOptions));
    });

    koobDataRequest3(
      'etl_db_7.department_koob',
      ['grade_name'],
      [],
      {
        y: ['=', currentYear],
        data_type: ['=', 'актуальные']
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      const gradeOptions = getSelectOptionsFromFiltersData(res, 'grade');
      dispatch(setGradeOptions(gradeOptions));
    });
  }, []);

  return (
    <main className="departmentPage">
      <h1 style={{ display: 'none' }}>Страница департамента</h1>
      <FiltersBlock />
      <MainDepartmentSection />
      <DynamicChartsSection />
    </main>
  );
};

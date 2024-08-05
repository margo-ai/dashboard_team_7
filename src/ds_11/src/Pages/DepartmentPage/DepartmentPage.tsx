import React, { useEffect } from 'react';

import { FiltersBlock } from '../../Components/DepartmentPage/FiltersBlock';
import { MainDepartmentSection } from '../../Components/DepartmentPage/MainDepartmentSection';
import { DynamicChartsSection } from '../../Components/DepartmentPage/DynamicChartsSection';

import { getSelectOptionsFromFiltersData } from '../../utils/helpers';
import { setDepartmentOptions, setSkillTypeOptions, setGradeOptions } from '../../slices/filtersOptionsSlice';
import { fetchDepartments, fetchGrades, fetchSkillTypes } from '../../slices/filtersDataSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import './departmentPage.scss';

export const DepartmentPage = () => {
  const dispatch = useAppDispatch();

  const currentYear = useAppSelector((state) => state.currentFilters.year);

  const departments = useAppSelector((state) => state.filtersData.departments);
  const skillTypes = useAppSelector((state) => state.filtersData.skillTypes);
  const grades = useAppSelector((state) => state.filtersData.grades);

  useEffect(() => {
    dispatch(
      fetchDepartments({
        dimensions: ['department'],
        filters: {
          y: ['=', currentYear],
          data_type: ['=', 'актуальные']
        },
        requestName: 'departmentsData'
      })
    );
    dispatch(
      fetchSkillTypes({
        dimensions: ['skill_type'],
        filters: {
          y: ['=', currentYear],
          data_type: ['=', 'актуальные']
        },
        requestName: 'skillTypesData'
      })
    );
    dispatch(
      fetchGrades({
        dimensions: ['grade_name'],
        filters: {
          y: ['=', currentYear],
          data_type: ['=', 'актуальные']
        },
        requestName: 'gradesData'
      })
    );
  }, []);

  useEffect(() => {
    if (departments.length !== 0 && skillTypes.length !== 0 && grades.length !== 0) {
      const departmentOptions = getSelectOptionsFromFiltersData(departments, 'department');
      dispatch(setDepartmentOptions(departmentOptions));

      const skillTypeOptions = getSelectOptionsFromFiltersData(skillTypes, 'skillType');
      dispatch(setSkillTypeOptions(skillTypeOptions));

      const gradeOptions = getSelectOptionsFromFiltersData(grades, 'grade');
      dispatch(setGradeOptions(gradeOptions));
    }
  }, [departments, skillTypes, grades]);

  return (
    <main className="departmentPage">
      <h1 style={{ display: 'none' }}>Страница департамента</h1>
      <FiltersBlock />
      <MainDepartmentSection />
      <DynamicChartsSection />
    </main>
  );
};

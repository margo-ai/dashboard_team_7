import React, { useEffect, useState } from 'react';

import { SearchInput } from '../../ui/SearchInput';
import { EmployeeInfoTitle } from '../EmployeeInfoTitle';
import { EmployeeTitleIcon } from '../../ui/iconsComponents/EmployeeTitleIcon';
import { CertificateIcon } from '../../ui/iconsComponents/CertificateIcon';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import {
  fetchMainEmployee,
  setComparisonEmployeeData,
  setEmployeeData,
  setEmployeeDataError
} from '../../../slices/employeesSlice';
import { changeFirstLetterToUpperCase, sortSkillsArray } from '../../../utils/helpers';
import { setComparisonEmployeeSkills, setEmployeeSkills } from '../../../slices/skillsSlice';
import {
  setProgLang,
  setDbms,
  setFramework,
  setPlatform,
  setProgram,
  setSwT,
  setTool
} from '../../../slices/comparisonFiltersSlice';

import { fetchEmployeeRank } from '../../../slices/employeeRankSlice';

import './employeeSection.scss';
import { EmployeeDetails } from '../EmployeeDetails';
import { RatingBlock } from '../RatingBlock';

export const EmployeeSection = () => {
  const dispatch = useAppDispatch();

  const employeeData = useAppSelector((state) => state.employees.employeeData);
  const employeeLoadingStatus = useAppSelector((state) => state.employees.employeeLoadingStatus);
  const employeeDataError = useAppSelector((state) => state.employees.employeeDataError);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState<string>('');

  const handleSearchChange = (e) => {
    setEmployeeDataError(null);
    setError(false);
    setErrorText('');
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchName = searchTerm.trim().split(' ');

    if (searchName.length === 1) {
      setError(true);
      setErrorText('Введите имя и фамилию');
    } else {
      dispatch(
        fetchMainEmployee({
          dimensions: [
            'name',
            'surname',
            'skill_name',
            'skill_type',
            'email',
            'department',
            'position',
            'grade',
            'sort',
            'e_id'
          ],
          filters: {
            surname: ['=', changeFirstLetterToUpperCase(searchName[1])],
            name: ['=', changeFirstLetterToUpperCase(searchName[0])],
            highest_grade: ['=', '1']
          },
          requestName: 'mainEmployeeData'
        })
      );
    }
  };

  useEffect(() => {
    if (employeeData.length === 0 && !!employeeDataError) {
      setError(true);
      setErrorText(employeeDataError);
    } else {
      const sortedSkills = sortSkillsArray(employeeData);
      dispatch(setEmployeeSkills(sortedSkills));
    }
  }, [employeeData, employeeDataError]);

  const handleClearFunc = () => {
    setError(false);
    setErrorText('');
    setSearchTerm('');
    setEmployeeDataError(null);
    dispatch(setEmployeeData([]));
    dispatch(setComparisonEmployeeData([]));
    dispatch(setEmployeeSkills([]));
    dispatch(setComparisonEmployeeSkills([]));

    dispatch(setProgLang('Языки программирования'));
    dispatch(setDbms('Базы данных'));
    dispatch(setSwT('Типы систем'));
    dispatch(setFramework('Фреймворки'));
    dispatch(setPlatform('Платформы'));
    dispatch(setTool('Технологии'));
    dispatch(setProgram('Инструменты'));
  };

  useEffect(() => {
    if (employeeData.length !== 0) {
      dispatch(
        fetchEmployeeRank({
          dimensions: ['course_rank'],
          filters: { e_id: ['=', employeeData[0].employeeId] },
          requestName: ''
        })
      );
    }
  }, [employeeData]);

  return (
    <section className="employeeSection">
      <SearchInput
        handleSubmit={handleSubmit}
        searchTerm={searchTerm}
        onChange={handleSearchChange}
        handleClearFunc={handleClearFunc}
        error={error}
        errorText={errorText}
      />
      {employeeLoadingStatus === 'loading' && <div>Загрузка</div>}
      <div className="employeeSection__info">
        <EmployeeInfoTitle title="Сотрудник" width={271}>
          <EmployeeTitleIcon />
        </EmployeeInfoTitle>
        <EmployeeDetails />
      </div>
      {employeeData.length !== 0 && (
        <div className="employeeSection__courses">
          <EmployeeInfoTitle title="Курсы" width={271}>
            <CertificateIcon />
          </EmployeeInfoTitle>
          <RatingBlock />
        </div>
      )}
    </section>
  );
};

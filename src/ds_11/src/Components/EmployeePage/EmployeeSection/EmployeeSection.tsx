import React, { useEffect } from 'react';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

import { SearchInput } from '../../ui/SearchInput/SearchInput';
import { EmployeeInfoTitle } from '../EmployeeInfoTitle/EmployeeInfoTitle';
import { EmployeeTitleIcon } from '../../ui/iconsComponents/EmployeeTitleIcon/EmployeeTitleIcon';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';

import './employeeSection.scss';
import { setComparisonEmployeeData, setEmployeeData } from '../../../reducers/employeesSlice';
import { sortSkillsArray } from '../../../utils/helpers';
import { setComparisonEmployeeSkills, setEmployeeSkills } from '../../../reducers/skillsSlice';

import {
  setProgLang,
  setDbms,
  setFramework,
  setPlatform,
  setProgram,
  setSwT,
  setTool
} from '../../../reducers/comparisonFiltersSlice';

export const EmployeeSection = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.employee.employeeData);

  const setDataFunc = (mappedData) => {
    // localStorage.setItem('employee', mappedData[0].name);

    dispatch(setEmployeeData(mappedData));
    const sortedSkills = sortSkillsArray(mappedData);
    dispatch(setEmployeeSkills(sortedSkills));
  };

  const handleClearFunc = (setSearchTerm) => {
    setSearchTerm('');
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

  return (
    <section className="employeeSection">
      <SearchInput setDataFunc={setDataFunc} isMainEmployee handleClearFunc={handleClearFunc} />
      <div className="employeeSection__info">
        <EmployeeInfoTitle title="Сотрудник" width={271}>
          <EmployeeTitleIcon />
        </EmployeeInfoTitle>
        <ul className="employeeDetails">
          {data.length !== 0 ? (
            <>
              <li className="employeeDetails__item">{data[0].name}</li>
              <li className="employeeDetails__item">Контактная инф.: {data[0].email}</li>
              <li className="employeeDetails__item">Департамент: {data[0].department}</li>
              <li className="employeeDetails__item">Должность: {data[0].position}</li>
            </>
          ) : (
            <>Введите корректное имя сотрудника</>
          )}
        </ul>
      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
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

import { CertificateIcon } from '../../ui/iconsComponents/CertificateIcon/CertificateIcon';

export const EmployeeSection = () => {
  const dispatch = useAppDispatch();

  const [employeeRank, setEmployeeRank] = useState<number>(null);

  const employeeData = useAppSelector((state) => state.employee.employeeData);

  useEffect(() => {
    if (employeeData.length !== 0) {
      koobDataRequest3(
        'etl_db_7.employee_koob',
        ['course_rank'],
        [],
        { employee_id: ['=', employeeData[0].employeeId] },
        { schema_name: 'ds_11' },
        'ourRequest'
      ).then((res) => {
        setEmployeeRank(res[0].course_rank);
      });
    }

    console.log({ employeeData });
  }, [employeeData]);

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
      <SearchInput setDataFunc={setDataFunc} handleClearFunc={handleClearFunc} />
      <div className="employeeSection__info">
        <EmployeeInfoTitle title="Сотрудник" width={271}>
          <EmployeeTitleIcon />
        </EmployeeInfoTitle>
        <ul className="employeeDetails">
          {employeeData.length !== 0 ? (
            <>
              <li className="employeeDetails__item">{employeeData[0].name}</li>
              <li className="employeeDetails__item">Контактная инф.: {employeeData[0].email}</li>
              <li className="employeeDetails__item">Департамент: {employeeData[0].department}</li>
              <li className="employeeDetails__item">Должность: {employeeData[0].position}</li>
            </>
          ) : (
            <>Введите корректное имя сотрудника</>
          )}
        </ul>
      </div>
      {employeeData.length !== 0 && (
        <div className="employeeSection__courses">
          <EmployeeInfoTitle title="Курсы" width={271}>
            <CertificateIcon />
          </EmployeeInfoTitle>
          <div className="employeeSection__ratingBlock">
            <div className="employeeSection__ratingCircle">
              {!!employeeRank ? (
                <>
                  <div style={{ marginBottom: '35px' }}> Место в рейтинге по пройденным курсам </div>
                  <div style={{ fontSize: '48px' }}>{employeeRank}/20</div>
                </>
              ) : (
                'Данный сотрудник не проходил курсы'
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

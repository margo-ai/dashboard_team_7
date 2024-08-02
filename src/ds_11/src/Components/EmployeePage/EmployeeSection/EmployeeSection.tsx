import React, { useEffect, useState } from 'react';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

import { SearchInput } from '../../ui/SearchInput/SearchInput';
import { EmployeeInfoTitle } from '../EmployeeInfoTitle/EmployeeInfoTitle';
import { EmployeeTitleIcon } from '../../ui/iconsComponents/EmployeeTitleIcon/EmployeeTitleIcon';
import { CertificateIcon } from '../../ui/iconsComponents/CertificateIcon/CertificateIcon';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { setComparisonEmployeeData, setEmployeeData } from '../../../reducers/employeesSlice';
import { changeFirstLetterToUpperCase, sortSkillsArray } from '../../../utils/helpers';
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

import './employeeSection.scss';

export const EmployeeSection = () => {
  const dispatch = useAppDispatch();

  const [employeeRank, setEmployeeRank] = useState<number>(null);

  const employeeData = useAppSelector((state) => state.employee.employeeData);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState<string>('');

  const handleSearchChange = (e) => {
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
      koobDataRequest3(
        'etl_db_7.employee_koob',
        ['name', 'surname', 'skill_name', 'skill_type', 'email', 'department', 'position', 'grade', 'sort', 'e_id'],
        [],
        {
          surname: ['=', changeFirstLetterToUpperCase(searchName[1])],
          name: ['=', changeFirstLetterToUpperCase(searchName[0])],
          highest_grade: ['=', '1']
        },
        { schema_name: 'ds_11' },
        'ourRequest'
      ).then((res) => {
        if (res.length === 0) {
          setError(true);
          setErrorText('Сотрудник не найден');
        } else {
          const mappedData = res.map((el, i) => {
            return {
              name: `${el.name} ${el.surname}`,
              email: el.email,
              department: el.department,
              position: el.position,
              skillType: el.skill_type,
              skillName: el.skill_name,
              sort: el.sort,
              skillGrade: el.grade,
              employeeId: el.e_id
            };
          });

          dispatch(setEmployeeData(mappedData));
          const sortedSkills = sortSkillsArray(mappedData);
          dispatch(setEmployeeSkills(sortedSkills));
        }
      });
    }
  };

  const handleClearFunc = () => {
    setError(false);
    setErrorText('');
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

  useEffect(() => {
    if (employeeData.length !== 0) {
      koobDataRequest3(
        'etl_db_7.employee_koob',
        ['course_rank'],
        [],
        { e_id: ['=', employeeData[0].employeeId] },
        { schema_name: 'ds_11' },
        'ourRequest'
      ).then((res) => {
        setEmployeeRank(res[0].course_rank);
      });
    }

    console.log({ employeeData });
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

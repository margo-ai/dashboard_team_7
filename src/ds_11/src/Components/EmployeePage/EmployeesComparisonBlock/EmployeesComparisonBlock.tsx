import React, { useEffect, useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

import { SearchInput } from '../../ui/SearchInput';
import { LegendAndResetButtonBlock } from '../LegendAndResetButtonBlock';
import { RadarSelectFiltersBlock } from '../RadarSelectFiltersBlock';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import {
  fetchComparisonEmployee,
  setComparisonEmployeeData,
  setComparisonEmployeeDataError
} from '../../../slices/employeesSlice';
import {
  setProgLang,
  setDbms,
  setFramework,
  setPlatform,
  setProgram,
  setSwT,
  setTool
} from '../../../slices/comparisonFiltersSlice';
import {
  buildRadarChartData,
  changeFirstLetterToUpperCase,
  getSelectOptionsFromSkillsData,
  sortSkillsArray
} from '../../../utils/helpers';
import { setComparisonEmployeeSkills } from '../../../slices/skillsSlice';

import './employeesComparisonBlock.scss';

import { TRadarChartData } from '../../../utils/types';

export const EmployeesComparisonBlock = () => {
  const dispatch = useAppDispatch();

  const employeeData = useAppSelector((state) => state.employees.employeeData);
  const comparisonEmployeeData = useAppSelector((state) => state.employees.comparisonEmployeeData);
  const comparisonEmployeeLoadingStatus = useAppSelector((state) => state.employees.comparisonEmployeeLoadingStatus);
  const comparisonEmployeeDataError = useAppSelector((state) => state.employees.comparisonEmployeeDataError);

  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState<string>('');

  const [filtersOptions, setFiltersOptions] = useState([]);

  const progLangFilter = useAppSelector((state) => state.comparisonFilters.progLang.skill);
  const dbmsFilter = useAppSelector((state) => state.comparisonFilters.dbms.skill);
  const swTFilter = useAppSelector((state) => state.comparisonFilters.swT.skill);
  const frameworkFilter = useAppSelector((state) => state.comparisonFilters.framework.skill);
  const platformFilter = useAppSelector((state) => state.comparisonFilters.paltform.skill);
  const toolFilter = useAppSelector((state) => state.comparisonFilters.tool.skill);
  const programFilter = useAppSelector((state) => state.comparisonFilters.program.skill);

  const mainEmployeeSkillsData = useAppSelector((state) => state.skills.mainEmployeeSkills);
  const secondEmployeeSkillsData = useAppSelector((state) => state.skills.comparisonEmployeeSkills);

  const [radarData, setRadarData] = useState<TRadarChartData>([]);

  useEffect(() => {
    if (mainEmployeeSkillsData.length !== 0) {
      const options = getSelectOptionsFromSkillsData(mainEmployeeSkillsData);
      setFiltersOptions(options);

      let data = [];
      for (let i = 0; i < mainEmployeeSkillsData.length; i++) {
        data.push({
          type: mainEmployeeSkillsData[i].skillType,
          skill: mainEmployeeSkillsData[i].skillType,
          mainSort: 0
        });
      }

      setRadarData(data);
    }
  }, [mainEmployeeSkillsData]);

  useEffect(() => {
    const currentRadarData = buildRadarChartData({
      mainEmployeeSkillsData: mainEmployeeSkillsData,
      secondEmployeeSkillsData: secondEmployeeSkillsData,
      currentRadarChartData: radarData,
      progLangFilter,
      dbmsFilter,
      swTFilter,
      frameworkFilter,
      platformFilter,
      toolFilter,
      programFilter
    });

    setRadarData(currentRadarData);
  }, [
    progLangFilter,
    dbmsFilter,
    swTFilter,
    frameworkFilter,
    platformFilter,
    toolFilter,
    programFilter,
    secondEmployeeSkillsData
  ]);

  const handleSearchChange = (e) => {
    setComparisonEmployeeDataError(null);
    setError(false);
    setErrorText('');
    setSearchTerm(e.target.value);
  };

  const handleResetButton = () => {
    dispatch(setProgLang('Языки программирования'));
    dispatch(setDbms('Базы данных'));
    dispatch(setSwT('Типы систем'));
    dispatch(setFramework('Фреймворки'));
    dispatch(setPlatform('Платформы'));
    dispatch(setTool('Технологии'));
    dispatch(setProgram('Инструменты'));
  };

  const handleClearFunc = () => {
    setError(false);
    setErrorText('');
    setSearchTerm('');
    setComparisonEmployeeDataError(null);
    dispatch(setComparisonEmployeeData([]));
    dispatch(setComparisonEmployeeSkills([]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchName = searchTerm.trim().split(' ');

    if (searchName.length === 1) {
      setError(true);
      setErrorText('Введите имя и фамилию');
    } else {
      dispatch(
        fetchComparisonEmployee({
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
          requestName: 'comparisonEmployeeData'
        })
      );
    }
  };

  useEffect(() => {
    if (comparisonEmployeeData.length === 0 && !!comparisonEmployeeDataError) {
      setError(true);
      setErrorText(comparisonEmployeeDataError);
    } else {
      const sortedSkills = sortSkillsArray(comparisonEmployeeData);
      dispatch(setComparisonEmployeeSkills(sortedSkills));
    }
  }, [comparisonEmployeeData, comparisonEmployeeDataError, comparisonEmployeeLoadingStatus]);

  return (
    <div className="employeesComparisonBlock">
      <SearchInput
        handleSubmit={handleSubmit}
        searchTerm={searchTerm}
        onChange={handleSearchChange}
        handleClearFunc={handleClearFunc}
        error={error}
        errorText={errorText}
      />
      {comparisonEmployeeLoadingStatus === 'loading' ? (
        <div>Загрузка</div>
      ) : comparisonEmployeeData.length !== 0 ? (
        <div className="employeesComparisonBlock__name">{comparisonEmployeeData[0].name}</div>
      ) : null}
      <div className="employeesComparisonBlock__radarChart">
        <RadarChart outerRadius={180} width={500} height={400} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis orientation="middle" angle={90} domain={[0, 500]} />
          <Radar name="Mike" dataKey="secondSort" stroke="#000B40" fill="#0083FB" fillOpacity={0.8} />
          <Radar name="Lily" dataKey="mainSort" stroke="#F765A3" fill="#FFA5CB" fillOpacity={0.6} />
        </RadarChart>
      </div>
      <div className="employeesComparisonBlock__filtersAndLegend">
        <RadarSelectFiltersBlock filtersOptions={filtersOptions} />
        <LegendAndResetButtonBlock
          employeeData={employeeData}
          comparisonEmployeeData={comparisonEmployeeData}
          handleResetButton={handleResetButton}
        />
      </div>
    </div>
  );
};

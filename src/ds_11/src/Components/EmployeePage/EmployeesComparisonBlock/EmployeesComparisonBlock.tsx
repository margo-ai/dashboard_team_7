import React, { useEffect, useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

import { SearchInput } from '../../ui/SearchInput/SearchInput';
import { SelectFiltersBlock } from '../../SelectFiltersBlock/SelectFiltersBlock';
import { SelectFilters } from '../../SelectFilters/SelectFilters';
import { ResetFiltersButton } from '../../ui/ResetFiltersButton/ResetFiltersButton';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';

import { setComparisonEmployeeData } from '../../../reducers/employeesSlice';
import {
  setProgLang,
  setDbms,
  setFramework,
  setPlatform,
  setProgram,
  setSwT,
  setTool
} from '../../../reducers/comparisonFiltersSlice';
import {
  buildRadarChartData,
  changeFirstLetterToUpperCase,
  getSelectOptionsFromSkillsData,
  sortSkillsArray
} from '../../../utils/helpers';
import { setComparisonEmployeeSkills } from '../../../reducers/skillsSlice';

import './employeesComparisonBlock.scss';
import { TRadarChartData } from '../../../utils/types';

export const EmployeesComparisonBlock = () => {
  const dispatch = useAppDispatch();

  const employeeData = useAppSelector((state) => state.employee.employeeData);
  const comparisonEmployeeData = useAppSelector((state) => state.employee.comparisonEmployeeData);

  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState<string>('');

  const handleSearchChange = (e) => {
    setError(false);
    setErrorText('');
    setSearchTerm(e.target.value);
  };

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

  const handleResetButton = () => {
    dispatch(setProgLang('Языки программирования'));
    dispatch(setDbms('Базы данных'));
    dispatch(setSwT('Типы систем'));
    dispatch(setFramework('Фреймворки'));
    dispatch(setPlatform('Платформы'));
    dispatch(setTool('Технологии'));
    dispatch(setProgram('Инструменты'));
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

          dispatch(setComparisonEmployeeData(mappedData));
          const sortedSkills = sortSkillsArray(mappedData);
          dispatch(setComparisonEmployeeSkills(sortedSkills));
        }
      });
    }
  };

  const handleClearFunc = () => {
    setSearchTerm('');
    dispatch(setComparisonEmployeeData([]));
    dispatch(setComparisonEmployeeSkills([]));
  };

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
      {comparisonEmployeeData.length !== 0 ? (
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
        <div>
          {filtersOptions.length !== 0 && (
            <SelectFiltersBlock>
              {filtersOptions[0].length > 1 ? (
                <SelectFilters
                  options={filtersOptions[0]}
                  setSelectedFilter={setProgLang}
                  selectedFilter={progLangFilter}
                />
              ) : null}
              {filtersOptions[1].length > 1 ? (
                <SelectFilters options={filtersOptions[1]} setSelectedFilter={setDbms} selectedFilter={dbmsFilter} />
              ) : null}
              {filtersOptions[2].length > 1 ? (
                <SelectFilters options={filtersOptions[2]} setSelectedFilter={setSwT} selectedFilter={swTFilter} />
              ) : null}
              {filtersOptions[3].length > 1 ? (
                <SelectFilters
                  options={filtersOptions[3]}
                  setSelectedFilter={setFramework}
                  selectedFilter={frameworkFilter}
                />
              ) : null}
              {filtersOptions[4].length > 1 ? (
                <SelectFilters
                  options={filtersOptions[4]}
                  setSelectedFilter={setPlatform}
                  selectedFilter={platformFilter}
                />
              ) : null}
              {filtersOptions[5].length > 1 ? (
                <SelectFilters options={filtersOptions[5]} setSelectedFilter={setTool} selectedFilter={toolFilter} />
              ) : null}
              {filtersOptions[6].length > 1 ? (
                <SelectFilters
                  options={filtersOptions[6]}
                  setSelectedFilter={setProgram}
                  selectedFilter={programFilter}
                />
              ) : null}
            </SelectFiltersBlock>
          )}
        </div>
        <div className="legendAndResetButtonBlock">
          {employeeData.length !== 0 ? (
            <div className="legendBlock">
              <div className="legendBlock__item">
                <div className="legendBlock__color" style={{ backgroundColor: '#FFA5CB' }} />
                <div className="legendBlock__name">{employeeData[0].name}</div>
              </div>
              {comparisonEmployeeData.length !== 0 && (
                <div className="legendBlock__item">
                  <div className="legendBlock__color" style={{ backgroundColor: '#0083FB' }} />
                  <div className="legendBlock__name">{comparisonEmployeeData[0].name}</div>
                </div>
              )}
            </div>
          ) : null}
          <ResetFiltersButton resetFunc={handleResetButton} />
        </div>
      </div>
    </div>
  );
};

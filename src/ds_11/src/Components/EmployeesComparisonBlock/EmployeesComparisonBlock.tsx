import React, { useEffect, useState } from 'react';

import './employeesComparisonBlock.scss';
import { SearchInput } from '../ui/SearchInput/SearchInput';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import { setComparisonEmployeeData } from '../../reducers/employeesSlice';
import {
  setProgLang,
  setDbms,
  setFramework,
  setPlatform,
  setProgram,
  setSwT,
  setTool
} from '../../reducers/comparisonFiltersSlice';

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { SelectFiltersBlock } from '../SelectFiltersBlock/SelectFiltersBlock';
import { SelectFilters } from '../SelectFilters/SelectFilters';
import { getSelectOptionsFromSkillsData, getSortOfCurrentSkill } from '../../utils/helpers';

export const EmployeesComparisonBlock = () => {
  const dispatch = useAppDispatch();

  const employeeData = useAppSelector((state) => state.employee.employeeData);
  const comparisonEmployeeData = useAppSelector((state) => state.employee.comparisonEmployeeData);

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

  const [radarData, setRadarData] = useState([]);

  useEffect(() => {
    if (mainEmployeeSkillsData.length !== 0) {
      const options = getSelectOptionsFromSkillsData(mainEmployeeSkillsData);
      setFiltersOptions(options);
      console.log({ options });

      let data = [];
      for (let i = 0; i < mainEmployeeSkillsData.length; i++) {
        data.push({
          type: mainEmployeeSkillsData[i].skillType,
          skill: mainEmployeeSkillsData[i].skillType,
          mainSort: 0
        });
      }
      console.log({ data });
      setRadarData(data);
    }
  }, [mainEmployeeSkillsData]);

  useEffect(() => {
    if (secondEmployeeSkillsData.length === 0) {
      const langSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Языки программирования', progLangFilter);
      const dbmsSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Базы данных', dbmsFilter);
      const swTSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Типы систем', swTFilter);
      const frameworkSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Фреймворки', frameworkFilter);
      const platformSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Платформы', platformFilter);
      const toolSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Технологии', toolFilter);
      const programSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Инструменты', programFilter);

      console.log({ langSortMain, dbmsSortMain });
      const newData = radarData.map((item) => {
        if (item.type === 'Языки программирования') {
          return { ...item, skill: progLangFilter, mainSort: langSortMain, secondSort: 0 };
        } else if (item.type === 'Базы данных') {
          return { ...item, skill: dbmsFilter, mainSort: dbmsSortMain, secondSort: 0 };
        } else if (item.type === 'Типы систем') {
          return { ...item, skill: swTFilter, mainSort: swTSortMain, secondSort: 0 };
        } else if (item.type === 'Фреймворки') {
          return { ...item, skill: frameworkFilter, mainSort: frameworkSortMain, secondSort: 0 };
        } else if (item.type === 'Платформы') {
          return { ...item, skill: platformFilter, mainSort: platformSortMain, secondSort: 0 };
        } else if (item.type === 'Технологии') {
          return { ...item, skill: toolFilter, mainSort: toolSortMain, secondSort: 0 };
        } else if (item.type === 'Инструменты') {
          return { ...item, skill: programFilter, mainSort: programSortMain, secondSort: 0 };
        }
      });

      console.log({ dataWithout: newData });
      setRadarData(newData);
    } else {
      const langSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Языки программирования', progLangFilter);
      const dbmsSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Базы данных', dbmsFilter);
      const swTSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Типы систем', swTFilter);
      const frameworkSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Фреймворки', frameworkFilter);
      const platformSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Платформы', platformFilter);
      const toolSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Технологии', toolFilter);
      const programSortMain = getSortOfCurrentSkill(mainEmployeeSkillsData, 'Инструменты', programFilter);

      console.log({ langSortMain, dbmsSortMain });
      const newData = radarData.map((item) => {
        if (item.type === 'Языки программирования') {
          return { ...item, skill: progLangFilter, mainSort: langSortMain };
        } else if (item.type === 'Базы данных') {
          return { ...item, skill: dbmsFilter, mainSort: dbmsSortMain };
        } else if (item.type === 'Типы систем') {
          return { ...item, skill: swTFilter, mainSort: swTSortMain };
        } else if (item.type === 'Фреймворки') {
          return { ...item, skill: frameworkFilter, mainSort: frameworkSortMain };
        } else if (item.type === 'Платформы') {
          return { ...item, skill: platformFilter, mainSort: platformSortMain };
        } else if (item.type === 'Технологии') {
          return { ...item, skill: toolFilter, mainSort: toolSortMain };
        } else if (item.type === 'Инструменты') {
          return { ...item, skill: programFilter, mainSort: programSortMain };
        }
      });

      const langSortSecond = getSortOfCurrentSkill(secondEmployeeSkillsData, 'Языки программирования', progLangFilter);
      const dbmsSortSecond = getSortOfCurrentSkill(secondEmployeeSkillsData, 'Базы данных', dbmsFilter);
      const swTSortSecond = getSortOfCurrentSkill(secondEmployeeSkillsData, 'Типы систем', swTFilter);
      const frameworkSortSecond = getSortOfCurrentSkill(secondEmployeeSkillsData, 'Фреймворки', frameworkFilter);
      const platformSortSecond = getSortOfCurrentSkill(secondEmployeeSkillsData, 'Платформы', platformFilter);
      const toolSortSecond = getSortOfCurrentSkill(secondEmployeeSkillsData, 'Технологии', toolFilter);
      const programSortSecond = getSortOfCurrentSkill(secondEmployeeSkillsData, 'Инструменты', programFilter);

      console.log({
        langSortSecond,
        dbmsSortSecond,
        swTSortSecond,
        frameworkSortSecond,
        platformSortSecond,
        toolSortSecond,
        programSortSecond
      });

      let dataWithSecondEmployee;

      console.log({ secondEmployee: secondEmployeeSkillsData });
      dataWithSecondEmployee = newData.map((item) => {
        if (item.type === 'Языки программирования') {
          return { ...item, secondSort: langSortSecond === undefined ? 0 : langSortSecond };
        } else if (item.type === 'Базы данных') {
          return { ...item, secondSort: dbmsSortSecond === undefined ? 0 : dbmsSortSecond };
        } else if (item.type === 'Типы систем') {
          return { ...item, secondSort: swTSortSecond === undefined ? 0 : swTSortSecond };
        } else if (item.type === 'Фреймворки') {
          return { ...item, secondSort: frameworkSortSecond === undefined ? 0 : frameworkSortSecond };
        } else if (item.type === 'Платформы') {
          return { ...item, secondSort: platformSortSecond === undefined ? 0 : platformSortSecond };
        } else if (item.type === 'Технологии') {
          return { ...item, secondSort: toolSortSecond === undefined ? 0 : toolSortSecond };
        } else if (item.type === 'Инструменты') {
          return { ...item, secondSort: programSortSecond === undefined ? 0 : programSortSecond };
        }
      });

      console.log({ dataWith: dataWithSecondEmployee });
      setRadarData(dataWithSecondEmployee);
    }
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

  const handleButton = () => {
    dispatch(setProgLang('Языки программирования'));
    dispatch(setDbms('Базы данных'));
    dispatch(setSwT('Типы систем'));
    dispatch(setFramework('Фреймворки'));
    dispatch(setPlatform('Платформы'));
    dispatch(setTool('Технологии'));
    dispatch(setProgram('Инструменты'));
  };

  return (
    <div className="employeesComparisonBlock">
      <SearchInput setStateFunc={setComparisonEmployeeData} />
      {comparisonEmployeeData.length !== 0 ? (
        <div className="employeesComparisonBlock__name">{comparisonEmployeeData[0].name}</div>
      ) : null}
      <div className="employeesComparisonBlock__radarChart">
        <RadarChart outerRadius={200} width={550} height={400} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis orientation="middle" angle={90} domain={[0, 500]} />
          <Radar name="Mike" dataKey="secondSort" stroke="#000B40" fill="#0083FB" fillOpacity={0.8} />
          <Radar name="Lily" dataKey="mainSort" stroke="#F765A3" fill="#FFA5CB" fillOpacity={0.6} />
          {/* <Legend /> */}
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
        <button onClick={handleButton}>Сбросить</button>

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
      </div>
    </div>
  );
};

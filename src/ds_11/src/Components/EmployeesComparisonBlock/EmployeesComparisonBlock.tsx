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

  const skillsData = useAppSelector((state) => state.skills.skills);

  const [radarData, setRadarData] = useState([]);

  // const data = [
  //   {
  //     skill: 'Chinesafadsfase'
  //     // A: 420,
  //     // B: 350,
  //     // fullMark: 500
  //   },
  //   {
  //     skill: 'ff'
  //     // A: 280,
  //     // B: 490,
  //     // fullMark: 500
  //   },
  //   {
  //     skill: 'ccc'
  //     // A: 250,
  //     // B: 199,
  //     // fullMark: 500
  //   },
  //   {
  //     skill: 'Phyvvvsics'
  //     // A: 500,
  //     // B: 350,
  //     // fullMark: 500
  //   },
  //   {
  //     skill: 'aaa'
  //     // A: 350,
  //     // B: 300,
  //     // fullMark: 500
  //   }
  // ];

  useEffect(() => {
    if (skillsData.length !== 0) {
      const options = getSelectOptionsFromSkillsData(skillsData);
      setFiltersOptions(options);
      console.log({ options });

      let data = [];
      for (let i = 0; i < skillsData.length; i++) {
        data.push({ type: skillsData[i].skillType, skill: skillsData[i].skillType, sort: 0 });
      }
      console.log({ data });
      setRadarData(data);
    }
  }, [skillsData]);

  useEffect(() => {
    const langSort = getSortOfCurrentSkill(skillsData, 'Языки программирования', progLangFilter);
    const dbmsSort = getSortOfCurrentSkill(skillsData, 'Базы данных', dbmsFilter);
    const swTSort = getSortOfCurrentSkill(skillsData, 'Типы систем', swTFilter);
    const frameworkSort = getSortOfCurrentSkill(skillsData, 'Фреймворки', frameworkFilter);
    const platformSort = getSortOfCurrentSkill(skillsData, 'Платформы', platformFilter);
    const toolSort = getSortOfCurrentSkill(skillsData, 'Технологии', toolFilter);
    const programSort = getSortOfCurrentSkill(skillsData, 'Инструменты', programFilter);

    console.log({ langSort, dbmsSort });
    const newData = radarData.map((item) => {
      if (item.type === 'Языки программирования') {
        return { ...item, skill: progLangFilter, sort: langSort };
      } else if (item.type === 'Базы данных') {
        return { ...item, skill: dbmsFilter, sort: dbmsSort };
      } else if (item.type === 'Типы систем') {
        return { ...item, skill: swTFilter, sort: swTSort };
      } else if (item.type === 'Фреймворки') {
        return { ...item, skill: frameworkFilter, sort: frameworkSort };
      } else if (item.type === 'Платформы') {
        return { ...item, skill: platformFilter, sort: platformSort };
      } else if (item.type === 'Технологии') {
        return { ...item, skill: toolFilter, sort: toolSort };
      } else if (item.type === 'Инструменты') {
        return { ...item, skill: programFilter, sort: programSort };
      }
    });
    console.log({ newData });
    setRadarData(newData);
  }, [progLangFilter, dbmsFilter, swTFilter, frameworkFilter, platformFilter, toolFilter, programFilter]);

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
          {/* <Radar name="Mike" dataKey="sort" stroke="#000B40" fill="#0083FB" fillOpacity={0.6} /> */}
          <Radar name="Lily" dataKey="sort" stroke="#F765A3" fill="#FFA5CB" fillOpacity={0.6} />
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

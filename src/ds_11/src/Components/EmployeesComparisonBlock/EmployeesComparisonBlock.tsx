import React, { useEffect, useState } from 'react';

import './employeesComparisonBlock.scss';
import { SearchInput } from '../ui/SearchInput/SearchInput';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import { setComparisonEmployeeData } from '../../reducers/employeesSlice';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { SelectFiltersBlock } from '../SelectFiltersBlock/SelectFiltersBlock';
import { SelectFilters } from '../SelectFilters/SelectFilters';

export const EmployeesComparisonBlock = () => {
  // const [comparisonEmployee, setComparisonEmployee] = useState([]);
  const employeeData = useAppSelector((state) => state.employee.employeeData);
  const comparisonEmployeeData = useAppSelector((state) => state.employee.comparisonEmployeeData);

  const skillsData = useAppSelector((state) => state.skills.skills);

  const data = [
    {
      subject: 'Math',
      A: 200,
      B: 300,
      fullMark: 500
    },
    {
      subject: 'Chinese',
      A: 420,
      B: 350,
      fullMark: 500
    },
    {
      subject: 'English',
      A: 280,
      B: 490,
      fullMark: 500
    },
    {
      subject: 'Geography',
      A: 250,
      B: 199,
      fullMark: 500
    },
    {
      subject: 'Physics',
      A: 500,
      B: 350,
      fullMark: 500
    },
    {
      subject: 'History',
      A: 350,
      B: 300,
      fullMark: 500
    }
  ];

  useEffect(() => {
    // console.log({ comparisonEmployeeData });
    // console.log({ employeeData });
    console.log(skillsData);
  }, [skillsData]);

  return (
    <div className="employeesComparisonBlock">
      <SearchInput setStateFunc={setComparisonEmployeeData} />
      {comparisonEmployeeData.length !== 0 ? (
        <div className="employeesComparisonBlock__name">{comparisonEmployeeData[0].name}</div>
      ) : null}
      <div className="employeesComparisonBlock__radarChart">
        <RadarChart outerRadius={200} width={550} height={400} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis orientation="middle" angle={90} domain={[0, 500]} />
          <Radar name="Mike" dataKey="A" stroke="#000B40" fill="#0083FB" fillOpacity={0.6} />
          <Radar name="Lily" dataKey="B" stroke="#F765A3" fill="#FFA5CB" fillOpacity={0.6} />
          {/* <Legend /> */}
        </RadarChart>
      </div>
      <div className="employeesComparisonBlock__filtersAndLegend">
        {/* <SelectFiltersBlock>
          <SelectFilters />
          <SelectFilters />
          <SelectFilters />
          <SelectFilters />
          <SelectFilters />
          <SelectFilters />
          <SelectFilters />
        </SelectFiltersBlock> */}
        {employeeData.length !== 0 && comparisonEmployeeData.length !== 0 ? (
          <div className="legendBlock">
            <div className="legendBlock__item">
              <div className="legendBlock__color" style={{ backgroundColor: '#FFA5CB' }} />
              <div className="legendBlock__name">{employeeData[0].name}</div>
            </div>
            <div className="legendBlock__item">
              <div className="legendBlock__color" style={{ backgroundColor: '#0083FB' }} />
              <div className="legendBlock__name">{comparisonEmployeeData[0].name}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

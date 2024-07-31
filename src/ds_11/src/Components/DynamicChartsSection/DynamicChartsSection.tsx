import React, { useEffect, useState } from 'react';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  Label,
  LineChart,
  Line
} from 'recharts';

import './dynamicChartsSection.scss';
import { CustomTooltip } from '../ui/CustomTooltip/CustomTooltip';
import { useAppSelector } from '../../utils/hooks';
import { createRequestFilters, joinAvgSkills, transformSkillsUpChartData } from '../../utils/helpers';
import { TAvgSkills, TSkillsUpEmployees } from '../../utils/types';
import { SelectFiltersBlock } from '../SelectFiltersBlock/SelectFiltersBlock';
import { SelectFilters } from '../SelectFilters/SelectFilters';
import { setGradeFilter } from '../../reducers/currentFiltersReducer';

export const DynamicChartsSection = () => {
  const [haveCertEmployees, setHaveCertEmployees] = useState<TSkillsUpEmployees>([]);
  const [haventCertEmployees, setHaventCertEmployees] = useState<TSkillsUpEmployees>([]);
  const [skillUpChartData, setSkillUpChartData] = useState([]);

  const [avgSkillsWithCert, setAvgSkillsWithCert] = useState<TAvgSkills>([]);
  const [avgSkillsWithoutCert, setAvgSkillsWithoutCert] = useState<TAvgSkills>([]);
  const [avgSkillsChartData, setAvgSkillsChartData] = useState([]);

  const gradeOptions = useAppSelector((state) => state.filtersOptions.grade);
  const currentYear = useAppSelector((state) => state.currentFilters.year);
  const currentDepartment = useAppSelector((state) => state.currentFilters.department);
  const currentSkillType = useAppSelector((state) => state.currentFilters.skillType);
  const currentGrade = useAppSelector((state) => state.currentFilters.grade);

  useEffect(() => {
    koobDataRequest3(
      'etl_db_7.department_koob_1',
      ['quarter'],
      ['count(employee_id)'],
      {
        y: ['=', currentYear],
        cer_flag: ['=', 1],
        data_type: ['=', 'актуальные'],
        '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType, grade: currentGrade })
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res: TSkillsUpEmployees) => {
      setHaveCertEmployees(res);
    });

    koobDataRequest3(
      'etl_db_7.department_koob_1',
      ['quarter'],
      ['count(employee_id)'],
      {
        y: ['=', currentYear],
        cer_flag: ['=', 0],
        data_type: ['=', 'актуальные'],
        '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType, grade: currentGrade })
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res2: TSkillsUpEmployees) => {
      setHaventCertEmployees(res2);
    });
  }, [currentYear, currentDepartment, currentSkillType, currentGrade]);

  useEffect(() => {
    const result = transformSkillsUpChartData(haveCertEmployees, haventCertEmployees);

    setSkillUpChartData(result);
  }, [haveCertEmployees, haventCertEmployees]);

  const percentageFormatter = (value) => {
    return `${value}%`;
  };

  useEffect(() => {
    koobDataRequest3(
      'etl_db_7.department_koob_1',
      ['quarter', 'count(distinct(employee_id))', 'count(skill_id)'],
      [],
      {
        y: ['=', currentYear],
        cer_flag: ['=', 1],
        rank_grade: ['=', 1],
        '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType, grade: currentGrade })
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      setAvgSkillsWithCert(res);
    });

    koobDataRequest3(
      'etl_db_7.department_koob_1',
      ['quarter', 'count(distinct(employee_id))', 'count(skill_id)'],
      [],
      {
        y: ['=', currentYear],
        cer_flag: ['=', 0],
        rank_grade: ['=', 1],
        '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType, grade: currentGrade })
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      setAvgSkillsWithoutCert(res);
    });
  }, [currentYear, currentDepartment, currentSkillType, currentGrade]);

  useEffect(() => {
    const joinedAvgSkillsData = joinAvgSkills(avgSkillsWithCert, avgSkillsWithoutCert);
    setAvgSkillsChartData(joinedAvgSkillsData);
  }, [avgSkillsWithCert, avgSkillsWithoutCert]);

  return (
    <section className="dynamicGraphicsSection">
      <div className="skillsUpChart">
        <h2 className="skillsUpChart__title">Влияние прохождения курсов на частоту улучшения навыков</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={skillUpChartData}>
            <CartesianGrid vertical={false} strokeDasharray="5" stroke="#313359" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#fff', fontSize: '11px', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              label={{ value: 'Процент повысивших', angle: -90, position: 'insideBottomLeft' }}
              domain={[0, 100]}
              tickFormatter={percentageFormatter}
              tick={{ fill: '#fff', fontSize: '12px' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip formatter={(value) => [`${value}%`, 'Процент']} />
            {/* <Tooltip content={<CustomTooltip />} /> */}
            <Bar dataKey="haventCert" className="haveCert" width={30} />
            <Bar dataKey="haveCert" className="haventCert" width={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="avgSkillsChart">
        <h2 className="avgSkillsChart__title">
          Влияние прохождения курсов на среднее число навыков сотрудников по грейдам
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={avgSkillsChartData}>
            <CartesianGrid vertical={false} strokeDasharray="5" stroke="#313359" />
            <XAxis
              dataKey="quarter"
              tick={{ fill: '#fff', fontSize: '12px', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              label={{ value: 'Количество навыков', angle: -90, position: 'insideBottomLeft' }}
              domain={[0, 'auto']}
              tick={{ fill: '#fff', fontSize: '12px' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            {/* <Tooltip content={<CustomTooltip />} /> */}
            <Line type={'linear'} dataKey="withCert" className="haveCert" strokeWidth={3} dot={false} />
            <Line type={'linear'} dataKey="withoutCert" className="haventCert" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="dynamicGraphicsSection__filterAndLegend">
        {gradeOptions.length !== 0 && (
          <SelectFiltersBlock>
            <SelectFilters options={gradeOptions} setSelectedFilter={setGradeFilter} selectedFilter={currentGrade} />
          </SelectFiltersBlock>
        )}
        <div className="dynamicGraphicsSection__legend">
          <span className="dynamicGraphicsSection__haveCertSpan">получали</span> и
          <span className="dynamicGraphicsSection__haventCertSpan"> не получали</span> сертификаты в
          <span style={{ textDecoration: 'underline' }}> прошлом году</span>
        </div>
      </div>
    </section>
  );
};

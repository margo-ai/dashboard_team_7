import React, { useEffect, useState } from 'react';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, LineChart, Line } from 'recharts';

import { CustomTooltip } from '../ui/CustomTooltip/CustomTooltip';
import { SelectFiltersBlock } from '../SelectFiltersBlock/SelectFiltersBlock';
import { SelectFilters } from '../SelectFilters/SelectFilters';

import {
  createRequestFilters,
  joinAvgSkills,
  percentageFormatter,
  transformSkillsUpChartData
} from '../../utils/helpers';
import { TAvgSkills, TSkillsUpEmployeesWithCert, TSkillsUpEmployeesWithoutCert } from '../../utils/types';
import { useAppSelector } from '../../utils/hooks';
import { setGradeFilter } from '../../reducers/currentFiltersReducer';

import './dynamicChartsSection.scss';

type TSkillsUpChart = { quarter: string; haveCert: number; haventCert: number }[];
type TAvgSkillsChart = { quarter: string; withCert: number; withoutCert: number }[];

export const DynamicChartsSection = () => {
  const [haveCertEmployees, setHaveCertEmployees] = useState<TSkillsUpEmployeesWithCert>([]);
  const [haventCertEmployees, setHaventCertEmployees] = useState<TSkillsUpEmployeesWithoutCert>([]);
  const [skillUpChartData, setSkillUpChartData] = useState<TSkillsUpChart>([]);

  const [avgSkillsWithCert, setAvgSkillsWithCert] = useState<TAvgSkills>([]);
  const [avgSkillsWithoutCert, setAvgSkillsWithoutCert] = useState<TAvgSkills>([]);
  const [avgSkillsChartData, setAvgSkillsChartData] = useState<TAvgSkillsChart>([]);

  const gradeOptions = useAppSelector((state) => state.filtersOptions.grade);
  const currentYear = useAppSelector((state) => state.currentFilters.year);
  const currentDepartment = useAppSelector((state) => state.currentFilters.department);
  const currentSkillType = useAppSelector((state) => state.currentFilters.skillType);
  const currentGrade = useAppSelector((state) => state.currentFilters.grade);

  useEffect(() => {
    koobDataRequest3(
      'etl_db_7.department_koob',
      ['quarter', 'count(distinct(e_id))', 'avg(quantity_with_cer)'],
      [],
      {
        y: ['=', currentYear],
        cer_flag: ['=', 1],
        data_type: ['=', 'актуальные'],
        '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType, grade: currentGrade })
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      setHaveCertEmployees(res);
    });

    koobDataRequest3(
      'etl_db_7.department_koob',
      ['quarter', 'count(distinct(e_id))', 'avg(quantity_without_cer)'],
      [],
      {
        y: ['=', currentYear],
        cer_flag: ['=', 0],
        data_type: ['=', 'актуальные'],
        '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType, grade: currentGrade })
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      setHaventCertEmployees(res);
    });
  }, [currentYear, currentDepartment, currentSkillType, currentGrade]);

  useEffect(() => {
    const result = transformSkillsUpChartData(haveCertEmployees, haventCertEmployees);

    setSkillUpChartData(result);
  }, [haveCertEmployees, haventCertEmployees]);

  useEffect(() => {
    koobDataRequest3(
      'etl_db_7.department_koob',
      ['quarter', 'count(distinct(e_id))', 'count(skill_id)'],
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
      'etl_db_7.department_koob',
      ['quarter', 'count(distinct(e_id))', 'count(skill_id)'],
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
    const result = joinAvgSkills(avgSkillsWithCert, avgSkillsWithoutCert);

    setAvgSkillsChartData(result);
  }, [avgSkillsWithCert, avgSkillsWithoutCert]);

  return (
    <section className="dynamicChartsSection">
      <div className="skillsUpChart">
        <h2 className="skillsUpChart__title">Влияние прохождения курсов на частоту улучшения навыков</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={skillUpChartData}>
            <CartesianGrid vertical={false} strokeDasharray="5" stroke="#313359" />
            <XAxis
              dataKey="quarter"
              tick={{ fill: '#fff', fontSize: '11px', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              label={{ value: 'Процент повысивших', angle: -90, position: 'insideBottomLeft' }}
              domain={[0, 'auto']}
              tickFormatter={percentageFormatter}
              tick={{ fill: '#fff', fontSize: '12px' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip chartType="bar" />} />
            <Bar dataKey="haveCert" className="haveCert" width={30} />
            <Bar dataKey="haventCert" className="haventCert" width={30} />
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
            <Tooltip content={<CustomTooltip chartType="line" />} />
            <Line type={'linear'} dataKey="withCert" className="haveCert" strokeWidth={3} dot={false} />
            <Line type={'linear'} dataKey="withoutCert" className="haventCert" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="dynamicChartsSection__filterAndLegend">
        {gradeOptions.length !== 0 && (
          <SelectFiltersBlock>
            <SelectFilters options={gradeOptions} setSelectedFilter={setGradeFilter} selectedFilter={currentGrade} />
          </SelectFiltersBlock>
        )}
        <div className="dynamicChartsSection__legend">
          <span className="dynamicChartsSection__haveCertSpan">получали</span> и
          <span className="dynamicChartsSection__haventCertSpan"> не получали</span> сертификаты в
          <span style={{ textDecoration: 'underline' }}> прошлом году</span>
        </div>
      </div>
    </section>
  );
};

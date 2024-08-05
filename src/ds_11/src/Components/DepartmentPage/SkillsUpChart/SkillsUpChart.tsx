import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

import { CustomTooltip } from '../../ui/CustomTooltip';

import { createRequestFilters, percentageFormatter, transformSkillsUpChartData } from '../../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import {
  fetchSkillsUpEmployeesWithCert,
  fetchSkillsUpEmployeesWithoutCert
} from '../../../slices/skillsUpEmployeesSlice';

import './skillsUpChart.scss';

type TSkillsUpChart = { quarter: string; haveCert: number; haventCert: number }[];

export const SkillsUpChart = () => {
  const dispatch = useAppDispatch();

  const haveCertEmployees = useAppSelector((state) => state.skillsUpEmployees.haveCertEmployees);
  const haventCertEmployees = useAppSelector((state) => state.skillsUpEmployees.haventCertEmployees);
  const [skillUpChartData, setSkillUpChartData] = useState<TSkillsUpChart>([]);

  const currentYear = useAppSelector((state) => state.currentFilters.year);
  const currentDepartment = useAppSelector((state) => state.currentFilters.department);
  const currentSkillType = useAppSelector((state) => state.currentFilters.skillType);
  const currentGrade = useAppSelector((state) => state.currentFilters.grade);

  useEffect(() => {
    dispatch(
      fetchSkillsUpEmployeesWithCert({
        dimensions: ['quarter', 'count(distinct(e_id))', 'avg(quantity_with_cer)'],
        filters: {
          y: ['=', currentYear],
          cer_flag: ['=', 1],
          data_type: ['=', 'актуальные'],
          '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType, grade: currentGrade })
        },
        requestName: 'skillUpEmployeesWithCert'
      })
    );

    dispatch(
      fetchSkillsUpEmployeesWithoutCert({
        dimensions: ['quarter', 'count(distinct(e_id))', 'avg(quantity_without_cer)'],
        filters: {
          y: ['=', currentYear],
          cer_flag: ['=', 0],
          data_type: ['=', 'актуальные'],
          '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType, grade: currentGrade })
        },
        requestName: 'skillUpEmployeesWithoutCert'
      })
    );
  }, [currentYear, currentDepartment, currentSkillType, currentGrade]);

  useEffect(() => {
    if (haveCertEmployees.length !== 0 && haventCertEmployees.length !== 0) {
      const result = transformSkillsUpChartData(haveCertEmployees, haventCertEmployees);

      setSkillUpChartData(result);
    }
  }, [haveCertEmployees, haventCertEmployees]);

  return (
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
  );
};

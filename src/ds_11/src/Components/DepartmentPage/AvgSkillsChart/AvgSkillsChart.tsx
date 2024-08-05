import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

import { CustomTooltip } from '../../ui/CustomTooltip';

import { createRequestFilters, joinAvgSkills } from '../../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { fetchAvgSkillsWithCert, fetchAvgSkillsWithoutCert } from '../../../slices/avgSkillsSlice';

import './avgSkillsChart.scss';

type TAvgSkillsChart = { quarter: string; withCert: number; withoutCert: number }[];

export const AvgSkillsChart = () => {
  const dispatch = useAppDispatch();

  const avgSkillsWithCert = useAppSelector((state) => state.avgSkills.avgSkillsWithCert);
  const avgSkillsWithoutCert = useAppSelector((state) => state.avgSkills.avgSkillsWithoutCert);
  const [avgSkillsChartData, setAvgSkillsChartData] = useState<TAvgSkillsChart>([]);

  const currentYear = useAppSelector((state) => state.currentFilters.year);
  const currentDepartment = useAppSelector((state) => state.currentFilters.department);
  const currentSkillType = useAppSelector((state) => state.currentFilters.skillType);
  const currentGrade = useAppSelector((state) => state.currentFilters.grade);

  useEffect(() => {
    dispatch(
      fetchAvgSkillsWithCert({
        dimensions: ['quarter', 'count(distinct(e_id))', 'count(skill_id)'],
        filters: {
          y: ['=', currentYear],
          cer_flag: ['=', 1],
          rank_grade: ['=', 1],
          '': createRequestFilters({
            department: currentDepartment,
            skillType: currentSkillType,
            grade: currentGrade
          })
        },
        requestName: 'avgSkillsWithCert'
      })
    );

    dispatch(
      fetchAvgSkillsWithoutCert({
        dimensions: ['quarter', 'count(distinct(e_id))', 'count(skill_id)'],
        filters: {
          y: ['=', currentYear],
          cer_flag: ['=', 0],
          rank_grade: ['=', 1],
          '': createRequestFilters({
            department: currentDepartment,
            skillType: currentSkillType,
            grade: currentGrade
          })
        },
        requestName: 'avgSkillsWithoutCert'
      })
    );
  }, [currentYear, currentDepartment, currentSkillType, currentGrade]);

  useEffect(() => {
    if (avgSkillsWithCert.length !== 0 && avgSkillsWithoutCert.length !== 0) {
      const result = joinAvgSkills(avgSkillsWithCert, avgSkillsWithoutCert);
      setAvgSkillsChartData(result);
    }
  }, [avgSkillsWithCert, avgSkillsWithoutCert]);
  return (
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
  );
};

export default AvgSkillsChart;

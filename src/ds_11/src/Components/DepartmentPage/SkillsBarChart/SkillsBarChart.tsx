import React, { useEffect, useState } from 'react';
import { CartesianGrid, ResponsiveContainer, XAxis, YAxis, BarChart, Bar, Tooltip } from 'recharts';

import { BarLegendItem } from '../../ui/BarLegendItem';

import { createRequestFilters, fillMissingGrades, groupLowestSkillsData } from '../../../utils/helpers';
import { barChartColors } from '../../../utils/constants';
import { useAppSelector, useAppDispatch } from '../../../utils/hooks';
import { fetchSkillsIds, fetchLowestSkillsData } from '../../../slices/lowestSkillsSlice';

import { TLowestSkills } from '../../../utils/types';

import './skillsBarChart.scss';

export const SkillsBarChart = () => {
  const dispatch = useAppDispatch();

  const currentYear = useAppSelector((state) => state.currentFilters.year);
  const currentDepartment = useAppSelector((state) => state.currentFilters.department);
  const currentSkillType = useAppSelector((state) => state.currentFilters.skillType);
  const currentGrade = useAppSelector((state) => state.currentFilters.grade);

  const currentSkillIds = useAppSelector((state) => state.lowestSkills.skillIds);
  const currentLowestSkills = useAppSelector((state) => state.lowestSkills.lowestSkillsData);

  const [skillsBarChartData, setSkillsBarChartData] = useState<TLowestSkills>([]);

  useEffect(() => {
    dispatch(
      fetchSkillsIds({
        dimensions: ['skill_type', 'skill_id'],
        measures: ['avg(sort)'],
        filters: {
          y: ['=', currentYear],
          rank_grade: ['=', 1],
          quarter: ['=', '4'],
          '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType })
        },
        requestName: 'skillsIdsData'
      })
    );
  }, [currentYear, currentDepartment, currentSkillType, currentGrade]);

  useEffect(() => {
    if (currentSkillIds.length !== 0) {
      dispatch(
        fetchLowestSkillsData({
          dimensions: ['skill_id', 'skill_name', 'grade_name', 'count(distinct(e_id))'],
          measures: ['avg(sort)'],
          filters: {
            y: ['=', currentYear],
            rank_grade: ['=', 1],
            quarter: ['=', '4'],
            skill_id: [
              'or',
              ['=', currentSkillIds[0]],
              ['=', currentSkillIds[1]],
              ['=', currentSkillIds[2]],
              ['=', currentSkillIds[3]],
              ['=', currentSkillIds[4]]
            ]
          },
          requestName: 'lowestSkillsData'
        })
      );
    }
  }, [currentSkillIds]);

  useEffect(() => {
    if (currentLowestSkills.length !== 0) {
      const lowestSkillsData = groupLowestSkillsData(currentLowestSkills, currentSkillIds);
      const arrayWithAllGrades = fillMissingGrades(lowestSkillsData);

      setSkillsBarChartData(arrayWithAllGrades);
    }
  }, [currentLowestSkills]);

  return (
    <div className="skillsBarChart">
      <div className="skillsBarChart__chart">
        <h2 className="skillsBarChart__title">Топ 5 навыков с наименьшими грейдами</h2>
        <ResponsiveContainer width="100%" height={328}>
          <BarChart data={skillsBarChartData}>
            <CartesianGrid vertical={false} strokeDasharray="5" stroke="#313359" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#fff', fontSize: '11px', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              label={{ value: 'Сотрудники', angle: -90, position: 'insideLeft' }}
              domain={[0, 'auto']}
              tick={{ fill: '#fff', fontSize: '12px' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Bar dataKey="Использовал на проекте" fill={barChartColors[5]} width={15} />
            <Bar dataKey="Junior" fill={barChartColors[0]} width={15} />
            <Bar dataKey="Middle" fill={barChartColors[1]} width={15} />
            <Bar dataKey="Novice" fill={barChartColors[2]} width={15} />
            <Bar dataKey="Senior" fill={barChartColors[3]} width={15} />
            <Bar dataKey="Expert" fill={barChartColors[4]} width={15} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="skillsBarChart__legend">
        <ul className="skillsBarChart__legendList">
          <BarLegendItem color={barChartColors[0]}>Novice</BarLegendItem>
          <BarLegendItem color={barChartColors[1]}>Junior</BarLegendItem>
          <BarLegendItem color={barChartColors[2]}>Middle</BarLegendItem>
          <BarLegendItem color={barChartColors[3]}>Senior</BarLegendItem>
          <BarLegendItem color={barChartColors[4]}>Expert</BarLegendItem>
          <BarLegendItem color={barChartColors[5]}>Использовал на проекте</BarLegendItem>
        </ul>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { CartesianGrid, ResponsiveContainer, XAxis, YAxis, BarChart, Bar, Tooltip } from 'recharts';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

import { createRequestFilters, fillMissingGrades, groupLowestSkillsData } from '../../utils/helpers';
import { barChartColors } from '../../utils/constants';
import { useAppSelector } from '../../utils/hooks';

import './skillsBarChart.scss';

import { TLowestSkills, TLowestSkillsIds } from '../../utils/types';

export const SkillsBarChart = () => {
  const currentYear = useAppSelector((state) => state.currentFilters.year);
  const currentDepartment = useAppSelector((state) => state.currentFilters.department);
  const currentSkillType = useAppSelector((state) => state.currentFilters.skillType);
  const currentGrade = useAppSelector((state) => state.currentFilters.grade);

  const [skillIds, setSkillIds] = useState<TLowestSkillsIds>([]);
  const [skillsBarChartData, setSkillsBarChartData] = useState<TLowestSkills>([]);

  useEffect(() => {
    koobDataRequest3(
      'etl_db_7.department_koob',
      ['skill_type', 'skill_id'],
      ['avg(sort)'],
      {
        y: ['=', currentYear],
        rank_grade: ['=', 1],
        quarter: ['=', '4'],
        '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType })
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      const skillsArray = res.filter((item) => item.sort !== 0);

      skillsArray.sort((a, b) => {
        const item_a = a.sort;
        const item_b = b.sort;
        return item_a - item_b;
      });

      const skillIds = skillsArray.slice(0, 5).map((item) => item.skill_id);
      setSkillIds(skillIds);
    });
  }, [currentYear, currentDepartment, currentSkillType, currentGrade]);

  useEffect(() => {
    koobDataRequest3(
      'etl_db_7.department_koob',
      ['skill_id', 'skill_name', 'grade_name', 'count(distinct(e_id))'],
      ['avg(sort)'],
      {
        y: ['=', currentYear],
        rank_grade: ['=', 1],
        quarter: ['=', '4'],
        skill_id: [
          'or',
          ['=', skillIds[0]],
          ['=', skillIds[1]],
          ['=', skillIds[2]],
          ['=', skillIds[3]],
          ['=', skillIds[4]]
        ]
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      const lowestSkillsData = groupLowestSkillsData(res, skillIds);
      const arrayWithAllGrades = fillMissingGrades(lowestSkillsData);

      setSkillsBarChartData(arrayWithAllGrades);
    });
  }, [skillIds]);

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
          <li className="skillsBarChart__legendItem" style={{ backgroundColor: `${barChartColors[0]}` }}>
            Novice
          </li>
          <li className="skillsBarChart__legendItem" style={{ backgroundColor: `${barChartColors[1]}` }}>
            Junior
          </li>
          <li className="skillsBarChart__legendItem" style={{ backgroundColor: `${barChartColors[2]}` }}>
            Middle
          </li>
          <li className="skillsBarChart__legendItem" style={{ backgroundColor: `${barChartColors[3]}` }}>
            Senior
          </li>
          <li className="skillsBarChart__legendItem" style={{ backgroundColor: `${barChartColors[4]}` }}>
            Expert
          </li>
          <li className="skillsBarChart__legendItem" style={{ backgroundColor: `${barChartColors[5]}` }}>
            Использовал на проекте
          </li>
        </ul>
      </div>
    </div>
  );
};

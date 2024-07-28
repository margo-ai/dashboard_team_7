import React, { useEffect } from 'react';

import './skillsBarChart.scss';

import { useAppSelector } from '../../utils/hooks';

export const SkillsBarChart = () => {
  const year = useAppSelector((state) => state.filters.year);
  useEffect(() => {
    console.log({ MAIN: year });
  }, [year]);

  return <div className="skillsBarChart">SkillsBarChart</div>;
};

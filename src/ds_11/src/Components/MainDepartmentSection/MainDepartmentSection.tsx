import React from 'react';

import { InfoBlock } from '../InfoBlock/InfoBlock';
import { SkillsBarChart } from '../SkillsBarChart/SkillsBarChart';

import './mainDepartmentSection.scss';

export const MainDepartmentSection = () => {
  return (
    <section className="mainDepartmentBlock">
      <InfoBlock />
      <SkillsBarChart />
    </section>
  );
};

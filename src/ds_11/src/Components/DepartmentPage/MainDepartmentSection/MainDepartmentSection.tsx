import React from 'react';

import { InfoBlock } from '../InfoBlock';
import { SkillsBarChart } from '../SkillsBarChart';

import './mainDepartmentSection.scss';

export const MainDepartmentSection = () => {
  return (
    <section className="mainDepartmentBlock">
      <InfoBlock />
      <SkillsBarChart />
    </section>
  );
};

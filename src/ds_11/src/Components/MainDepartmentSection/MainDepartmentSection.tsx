import React from 'react';

import './mainDepartmentSection.scss';
import { InfoBlock } from '../InfoBlock/InfoBlock';
import { SkillsBarChart } from '../SkillsBarChart/SkillsBarChart';

export const MainDepartmentSection = () => {
  return (
    <section className="mainDepartmentBlock">
      <InfoBlock />
      <SkillsBarChart />
    </section>
  );
};

import React from 'react';

import './mainDepartmentBlock.scss';
import { InfoBlock } from '../InfoBlock/InfoBlock';
import { SkillsBarChart } from '../SkillsBarChart/SkillsBarChart';

export const MainDepartmentBlock = () => {
  return (
    <div className="mainDepartmentBlock">
      <InfoBlock />
      <SkillsBarChart />
    </div>
  );
};

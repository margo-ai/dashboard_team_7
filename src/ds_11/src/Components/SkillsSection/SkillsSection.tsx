import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import './skillsSection.scss';
import { EmployeeInfoTitle } from '../EmployeeInfoTitle/EmployeeInfoTitle';
import { SkillsTitleIcon } from '../ui/iconsComponents/SkillsTitleIcon/SkillsTitleIcon';
import { BigDownArrowIcon } from '../ui/iconsComponents/BigDownArrowIcon/BigDownArrowIcon';
import { BigUpArrowIcon } from '../ui/iconsComponents/BigUpArrowIcon/BigUpArrowIcon';

export const SkillsSection = () => {
  const skillsData = useAppSelector((state) => state.skills.skills);

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  // const handleButtonClick = (tabName) => {
  //   setIsOpen(!isOpen);
  //   setActiveKey(activeKey === tabName ? null : tabName);
  //   console.log(tabName);
  // };
  const handleTabClick = (tabName) => {
    setActiveTab(activeTab === tabName ? null : tabName);
  };

  useEffect(() => {
    console.log({ skillsData });
  }, [skillsData]);

  return (
    <section className="skillsSection">
      <EmployeeInfoTitle title="Навыки" width={271}>
        <SkillsTitleIcon />
      </EmployeeInfoTitle>
      <div className="skillsSection__tabs">
        {skillsData.map((skill) => (
          <div className="skillsSection__tab">
            <button className="skillsSection__button" onClick={() => handleTabClick(skill.skillType)}>
              {skill.skillType}
              <div className="skillsSection__icon">
                {activeTab === skill.skillType ? <BigUpArrowIcon /> : <BigDownArrowIcon />}
              </div>
            </button>
            {activeTab === skill.skillType && (
              <ul className="skillsSection__list">
                {skill.data.map((skill) => (
                  <li className="skillsSection__item">
                    <div className="skillsSection__skill">{skill.skill}</div>
                    <div className="skillsSection__grade">{skill.grade}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

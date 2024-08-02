import React, { useState } from 'react';

import { EmployeeInfoTitle } from '../EmployeeInfoTitle/EmployeeInfoTitle';
import { SkillsTitleIcon } from '../../ui/iconsComponents/SkillsTitleIcon/SkillsTitleIcon';
import { BigDownArrowIcon } from '../../ui/iconsComponents/BigDownArrowIcon/BigDownArrowIcon';
import { BigUpArrowIcon } from '../../ui/iconsComponents/BigUpArrowIcon/BigUpArrowIcon';

import { useAppSelector } from '../../../utils/hooks';

import './skillsSection.scss';

export const SkillsSection = () => {
  const employeeData = useAppSelector((state) => state.employee.employeeData);
  const skillsData = useAppSelector((state) => state.skills.mainEmployeeSkills);

  const [activeTab, setActiveTab] = useState<string>(null);

  const handleTabClick = (tabName: string) => {
    setActiveTab(activeTab === tabName ? null : tabName);
  };

  return (
    <>
      {employeeData.length !== 0 && (
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
      )}
    </>
  );
};

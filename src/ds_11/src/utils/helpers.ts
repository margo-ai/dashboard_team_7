import { UrlState } from 'bi-internal/core';
import { TMappedData } from './types';

export const navigateToDboard = (dboard: string) => {
  UrlState.navigate({ dboard });
};

export const sortSkillsArray = (mappedData: TMappedData) => {
  const skillCategories = {
    tool: [],
    prog_lang: [],
    dbms: [],
    sw_t: [],
    framework: [],
    platform: [],
    program: []
  };

  for (let i = 0; i < mappedData.length; i++) {
    const skillType = mappedData[i].skillType;
    if (skillCategories[skillType]) {
      skillCategories[skillType].push({
        skill: mappedData[i]['skillName'],
        grade: mappedData[i]['skillGrade'],
        sort: mappedData[i]['sort']
      });
    }
  }

  const progLang = skillCategories['prog_lang'];
  const dbms = skillCategories['dbms'];
  const swT = skillCategories['sw_t'];
  const framework = skillCategories['framework'];
  const platform = skillCategories['platform'];
  const tool = skillCategories['tool'];
  const program = skillCategories['program'];

  const sortedSkills = [
    { skillType: 'Языки программирования', data: progLang },
    { skillType: 'Базы данных', data: dbms },
    { skillType: 'Типы систем', data: swT },
    { skillType: 'Фреймворки', data: framework },
    { skillType: 'Платформы', data: platform },
    { skillType: 'Технологии', data: tool },
    { skillType: 'Инструменты', data: program }
  ];

  const nonEmptySkills = sortedSkills.filter((item) => item.data.length !== 0);

  return nonEmptySkills;
};

type TSkillsData = {
  skillType: string;
  data: {
    sort: number;
    skill: string;
    grade: string;
  }[];
}[];

export const getSelectOptionsFromSkillsData = (skillsData: TSkillsData) => {
  const skillOptions = {
    'Языки программирования': [],
    'Базы данных': [],
    'Типы систем': [],
    Фреймворки: [],
    Платформы: [],
    Технологии: [],
    Инструменты: []
  };

  for (let i = 0; i < skillsData.length; i++) {
    const skillType = skillsData[i].skillType;
    if (skillOptions[skillType]) {
      for (let j = 0; j < skillsData[i].data.length; j++) {
        skillOptions[skillType].push({
          name: skillsData[i].data[j].skill,
          value: skillsData[i].data[j].skill
        });
      }
    }
  }

  const progLangOptions = skillOptions['Языки программирования'];
  const dbmsOptions = skillOptions['Базы данных'];
  const swTOptions = skillOptions['Типы систем'];
  const frameworkOptions = skillOptions['Фреймворки'];
  const platformOptions = skillOptions['Платформы'];
  const toolOptions = skillOptions['Технологии'];
  const programOptions = skillOptions['Инструменты'];

  progLangOptions.unshift({ name: 'Языки программирования', value: 'Языки программирования' });
  dbmsOptions.unshift({ name: 'Базы данных', value: 'Базы данных' });
  swTOptions.unshift({ name: 'Типы систем', value: 'Типы систем' });
  frameworkOptions.unshift({ name: 'Фреймворки', value: 'Фреймворки' });
  platformOptions.unshift({ name: 'Платформы', value: 'Платформы' });
  toolOptions.unshift({ name: 'Технологии', value: 'Технологии' });
  programOptions.unshift({ name: 'Инструменты', value: 'Инструменты' });

  return [progLangOptions, dbmsOptions, swTOptions, frameworkOptions, platformOptions, toolOptions, programOptions];
};

export const getSortOfCurrentSkill = (
  skillsData: TSkillsData,
  currentSkillType: string,
  currentSkillFilter: string
) => {
  const skillsArray = skillsData.filter((skills) => skills.skillType === currentSkillType);

  let sort: number;

  if (skillsArray.length !== 0) {
    if (currentSkillFilter === skillsArray[0].skillType) {
      sort = 0;
    } else {
      for (let i = 0; i < skillsArray.length; i++) {
        for (let j = 0; j < skillsArray[i].data.length; j++) {
          if (currentSkillFilter === skillsArray[i].data[j].skill) {
            sort = skillsArray[i].data[j].sort;
          }
        }
      }
    }
  }

  return sort;
};

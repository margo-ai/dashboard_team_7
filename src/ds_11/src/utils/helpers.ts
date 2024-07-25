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

  return [
    { skillType: 'Языки программирования', data: progLang },
    { skillType: 'Базы данных', data: dbms },
    { skillType: 'Типы систем', data: swT },
    { skillType: 'Фреймворки', data: framework },
    { skillType: 'Платформы', data: platform },
    { skillType: 'Технологии', data: tool },
    { skillType: 'Инструменты', data: program }
  ];
};

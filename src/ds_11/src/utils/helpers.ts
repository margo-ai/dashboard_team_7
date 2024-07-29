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

type TSkillsOptions = {
  'Языки программирования': { name: string; value: string }[];
  'Базы данных': { name: string; value: string }[];
  'Типы систем': { name: string; value: string }[];
  Фреймворки: { name: string; value: string }[];
  Платформы: { name: string; value: string }[];
  Технологии: { name: string; value: string }[];
  Инструменты: { name: string; value: string }[];
};

export const getSelectOptionsFromSkillsData = (skillsData: TSkillsData) => {
  const skillOptions: TSkillsOptions = {
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

const fillMissingQuarters = (data) => {
  const quarters = ['1', '2', '3', '4'];
  const result = [];

  quarters.forEach((quarter) => {
    const existingData = data.find((item) => item.quarter === quarter);

    if (existingData) {
      result.push(existingData);
    } else {
      result.push({ quarter, employee_id: 0 });
    }
  });

  return result;
};

type TSkillsUpData = { quarter: string; employee_id: number }[];

export const transformSkillsUpChartData = (withCertEmployees: TSkillsUpData, withoutCartEmployees: TSkillsUpData) => {
  const totalEmployeesCount = [0, 0, 0, 0];
  const haveCertCount = [0, 0, 0, 0];
  const haventCertCount = [0, 0, 0, 0];
  const haveCertResult = [];
  const haventCertResult = [];

  withCertEmployees.sort((a, b) => {
    const quarterA = Number(a.quarter);
    const quarterB = Number(b.quarter);
    return quarterA - quarterB;
  });

  withoutCartEmployees.sort((a, b) => {
    const quarterA = Number(a.quarter);
    const quarterB = Number(b.quarter);
    return quarterA - quarterB;
  });

  const updatedHaveCertEmployees = fillMissingQuarters(withCertEmployees);
  const updatedHaventCertEmployees = fillMissingQuarters(withoutCartEmployees);

  for (let i = 0; i < updatedHaveCertEmployees.length; i++) {
    haveCertCount[i] = updatedHaveCertEmployees[i].employee_id;
  }

  for (let i = 0; i < updatedHaventCertEmployees.length; i++) {
    haventCertCount[i] = updatedHaventCertEmployees[i].employee_id;
  }

  for (let i = 0; i < 4; i++) {
    totalEmployeesCount[i] = haveCertCount[i] + haventCertCount[i];
  }

  for (let i = 0; i < 4; i++) {
    if (totalEmployeesCount[i] === 0) {
      haveCertResult.push({ name: `${i + 1} квартал`, haveCert: 0 });
      haventCertResult.push(0);
    } else {
      haveCertResult.push({
        name: `${i + 1} квартал`,
        haveCert: Number(((haveCertCount[i] / totalEmployeesCount[i]) * 100).toFixed(2))
      });
      haventCertResult.push(Number(((haventCertCount[i] / totalEmployeesCount[i]) * 100).toFixed(2)));
    }
  }

  const result = haveCertResult.map((item, index) => {
    return { ...item, haventCert: haventCertResult[index] };
  });

  return result;
};

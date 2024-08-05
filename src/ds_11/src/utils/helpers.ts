import { UrlState } from 'bi-internal/core';
import {
  TLowestSkills,
  TLowestSkillsIds,
  TMappedData,
  TRadarChartData,
  TSkillsUpEmployeesWithCert,
  TSkillsUpEmployeesWithoutCert
} from './types';

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

const sortByOptionField = (fieldName) => {
  return (a, b) => (a[fieldName] > b[fieldName] ? 1 : -1);
};

interface IFiltersObject {
  department?: string;
  skill_type?: string;
  grade_name?: string;
}

type TFilterType = 'department' | 'skillType' | 'grade';

export const getSelectOptionsFromFiltersData = (filtersData: Array<IFiltersObject>, filterType: TFilterType) => {
  const selectOptions = filtersData.map((item) => {
    if (filterType === 'department') {
      return { name: item.department, value: item.department };
    } else if (filterType === 'skillType') {
      switch (item.skill_type) {
        case 'framework':
          return { name: 'Фреймворки', value: item.skill_type };
        case 'sw_t':
          return { name: 'Типы систем', value: item.skill_type };
        case 'program':
          return { name: 'Инструменты', value: item.skill_type };
        case 'prog_lang':
          return { name: 'Языки программирования', value: item.skill_type };
        case 'dbms':
          return { name: 'Базы данных', value: item.skill_type };
        case 'tool':
          return { name: 'Технологии', value: item.skill_type };
        case 'platform':
          return { name: 'Платформы', value: item.skill_type };
      }
    } else if (filterType === 'grade') {
      return { name: item.grade_name, value: item.grade_name };
    }
  });

  selectOptions.sort(sortByOptionField('name'));

  if (filterType === 'department') {
    selectOptions.unshift({ name: 'Все подразделения', value: 'Все подразделения' });
  } else if (filterType === 'skillType') {
    selectOptions.unshift({ name: 'Все типы навыков', value: 'Все типы навыков' });
  } else if (filterType === 'grade') {
    selectOptions.unshift({ name: 'Все грейды', value: 'Все грейды' });
  }

  return selectOptions;
};

const fillMissingQuarters = (data) => {
  const quarters = [1, 2, 3, 4];
  const result = [];

  quarters.forEach((quarter) => {
    const existingData = data.find((item) => item.quarter === quarter);

    if (existingData) {
      result.push(existingData);
    } else {
      result.push({ quarter, e_id: 0 });
    }
  });

  return result;
};

export const percentageFormatter = (value: number) => {
  return `${value}%`;
};

const sortByQuarter = (a, b) => {
  const quarterA = Number(a.quarter);
  const quarterB = Number(b.quarter);
  return quarterA - quarterB;
};

export const transformSkillsUpChartData = (
  withCertEmployees: TSkillsUpEmployeesWithCert,
  withoutCertEmployees: TSkillsUpEmployeesWithoutCert
) => {
  const withCertEmployeesCopy = [...withCertEmployees];
  const withoutCertEmployeesCopy = [...withoutCertEmployees];
  withCertEmployeesCopy.sort(sortByQuarter);

  withoutCertEmployeesCopy.sort(sortByQuarter);

  const updatedHaveCertEmployees = fillMissingQuarters(withCertEmployees);
  const updatedHaventCertEmployees = fillMissingQuarters(withoutCertEmployees);

  const haveCertResult = [];
  const haventCertResult = [];

  updatedHaveCertEmployees.forEach((entry) => {
    if (!entry.quantity_with_cer) {
      haveCertResult.push({ quarter: `${entry.quarter} квартал`, haveCert: 0 });
    } else {
      haveCertResult.push({
        quarter: `${entry.quarter} квартал`,
        haveCert: Number(((entry.e_id / entry.quantity_with_cer) * 100).toFixed(2))
      });
    }
  });

  updatedHaventCertEmployees.forEach((entry) => {
    if (!entry.quantity_without_cer) {
      haventCertResult.push({ quarter: `${entry.quarter} квартал`, haventCert: 0 });
    } else {
      haventCertResult.push({
        quarter: `${entry.quarter} квартал`,
        haventCert: Number(((entry.e_id / entry.quantity_without_cer) * 100).toFixed(2))
      });
    }
  });

  const result = haveCertResult.map((item, index) => {
    return { ...item, haventCert: haventCertResult[index].haventCert };
  });
  return result;
};

type TAvgSkillsData = { quarter: number; e_id: number; skill_id: number }[];

const getAvgSkills = (data: TAvgSkillsData) => {
  const transformedData = data.map((item) => {
    return {
      quarter: item.quarter,
      avgSkills: item.e_id === 0 ? 0 : Math.round(item.skill_id / item.e_id)
    };
  });
  return transformedData;
};

const avgSkillsArray = [
  { quarter: 1, avgSkills: 0 },
  { quarter: 2, avgSkills: 0 },
  { quarter: 3, avgSkills: 0 },
  { quarter: 4, avgSkills: 0 }
];

export const joinAvgSkills = (dataWithCert: TAvgSkillsData, dataWithoutCert: TAvgSkillsData) => {
  const withCertAvg = dataWithCert.length === 0 ? avgSkillsArray : getAvgSkills(dataWithCert);
  const withoutCertAvg = dataWithoutCert.length === 0 ? avgSkillsArray : getAvgSkills(dataWithoutCert);

  const joinedData = [];
  for (let i = 0; i < 4; i++) {
    const quarter = i + 1;
    const withCertItem = withCertAvg.find((item) => item.quarter === quarter);
    const withoutCertItem = withoutCertAvg.find((item) => item.quarter === quarter);

    joinedData.push({
      quarter: `${quarter} квартал`,
      withCert: withCertItem ? withCertItem.avgSkills : 0,
      withoutCert: withoutCertItem ? withoutCertItem.avgSkills : 0
    });
  }
  return joinedData;
};

const createLowestSkillObject = (data: TLowestSkills, chartData: {}[], dataIndex: number, chartIndex: number) => {
  if (!chartData[chartIndex].hasOwnProperty('name')) {
    chartData[chartIndex] = { name: data[dataIndex].skill_name, [data[dataIndex].grade_name]: data[dataIndex].e_id };
  } else {
    chartData[chartIndex] = { ...chartData[chartIndex], [data[dataIndex].grade_name]: data[dataIndex].e_id };
  }
};

export const groupLowestSkillsData = (data: TLowestSkills, skillIds: TLowestSkillsIds) => {
  const chartData = [{}, {}, {}, {}, {}];
  for (let i = 0; i < data.length; i++) {
    if (data[i].skill_id === skillIds[0]) {
      createLowestSkillObject(data, chartData, i, 0);
    } else if (data[i].skill_id === skillIds[1]) {
      createLowestSkillObject(data, chartData, i, 1);
    } else if (data[i].skill_id === skillIds[2]) {
      createLowestSkillObject(data, chartData, i, 2);
    } else if (data[i].skill_id === skillIds[3]) {
      createLowestSkillObject(data, chartData, i, 3);
    } else if (data[i].skill_id === skillIds[4]) {
      createLowestSkillObject(data, chartData, i, 4);
    }
  }

  return chartData;
};

export const fillMissingGrades = (data) => {
  const requiredGrades = ['Novice', 'Junior', 'Middle', 'Senior', 'Expert', 'Использовал на проекте'];

  return data.map((obj) => {
    requiredGrades.forEach((grade) => {
      if (!obj.hasOwnProperty(grade)) {
        obj[grade] = 0;
      }
    });
    return obj;
  });
};

type TRequestFilters = { department: string; skillType: string; grade?: string };

export const createRequestFilters = ({ department, skillType, grade }: TRequestFilters) => {
  const filtersArray: (string | string[])[] = ['and'];

  if (!!grade) {
    if (department === 'Все подразделения' && skillType === 'Все типы навыков' && grade === 'Все грейды') {
      return '';
    } else {
      if (department !== 'Все подразделения') {
        filtersArray.push(['=', ['column', 'department'], department]);
      }
      if (skillType !== 'Все типы навыков') {
        filtersArray.push(['=', ['column', 'skill_type'], skillType]);
      }
      if (grade !== 'Все грейды') {
        filtersArray.push(['=', ['column', 'grade_name'], grade]);
      }
    }
  } else {
    if (department === 'Все подразделения' && skillType === 'Все типы навыков') {
      return '';
    } else {
      if (department !== 'Все подразделения') {
        filtersArray.push(['=', ['column', 'department'], department]);
      }
      if (skillType !== 'Все типы навыков') {
        filtersArray.push(['=', ['column', 'skill_type'], skillType]);
      }
    }
  }

  return filtersArray;
};

export const changeFirstLetterToUpperCase = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

const getSortOfCurrentSkill = (skillsData: TSkillsData, currentSkillType: string, currentSkillFilter: string) => {
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

type TCreateSortsArray = {
  skillsData: TSkillsData;
  progLangFilter: string;
  dbmsFilter: string;
  swTFilter: string;
  frameworkFilter: string;
  platformFilter: string;
  toolFilter: string;
  programFilter: string;
};
const createSortsArray = ({
  skillsData,
  progLangFilter,
  dbmsFilter,
  swTFilter,
  frameworkFilter,
  platformFilter,
  toolFilter,
  programFilter
}: TCreateSortsArray) => {
  const langSort = getSortOfCurrentSkill(skillsData, 'Языки программирования', progLangFilter);
  const dbmsSort = getSortOfCurrentSkill(skillsData, 'Базы данных', dbmsFilter);
  const swTSort = getSortOfCurrentSkill(skillsData, 'Типы систем', swTFilter);
  const frameworkSort = getSortOfCurrentSkill(skillsData, 'Фреймворки', frameworkFilter);
  const platformSort = getSortOfCurrentSkill(skillsData, 'Платформы', platformFilter);
  const toolSort = getSortOfCurrentSkill(skillsData, 'Технологии', toolFilter);
  const programSort = getSortOfCurrentSkill(skillsData, 'Инструменты', programFilter);

  return [langSort, dbmsSort, swTSort, frameworkSort, platformSort, toolSort, programSort];
};

const createDataWithoutSecondEmployee = (currentRadarChartData, currentFiltersArray, employeeSortsArray) => {
  const dataWithoutSecondEmployee = currentRadarChartData.map((item) => {
    switch (item.type) {
      case 'Языки программирования':
        return { ...item, skill: currentFiltersArray[0], mainSort: employeeSortsArray[0], secondSort: 0 };
      case 'Базы данных':
        return { ...item, skill: currentFiltersArray[1], mainSort: employeeSortsArray[1], secondSort: 0 };
      case 'Типы систем':
        return { ...item, skill: currentFiltersArray[2], mainSort: employeeSortsArray[2], secondSort: 0 };
      case 'Фреймворки':
        return { ...item, skill: currentFiltersArray[3], mainSort: employeeSortsArray[3], secondSort: 0 };
      case 'Платформы':
        return { ...item, skill: currentFiltersArray[4], mainSort: employeeSortsArray[4], secondSort: 0 };
      case 'Технологии':
        return { ...item, skill: currentFiltersArray[5], mainSort: employeeSortsArray[5], secondSort: 0 };
      case 'Инструменты':
        return { ...item, skill: currentFiltersArray[6], mainSort: employeeSortsArray[6], secondSort: 0 };
    }
  });

  return dataWithoutSecondEmployee;
};

type TRadarChart = {
  mainEmployeeSkillsData: TSkillsData;
  secondEmployeeSkillsData?: TSkillsData;
  currentRadarChartData: TRadarChartData;

  progLangFilter: string;
  dbmsFilter: string;
  swTFilter: string;
  frameworkFilter: string;
  platformFilter: string;
  toolFilter: string;
  programFilter: string;
};

export const buildRadarChartData = ({
  mainEmployeeSkillsData,
  secondEmployeeSkillsData,
  currentRadarChartData,
  progLangFilter,
  dbmsFilter,
  swTFilter,
  frameworkFilter,
  platformFilter,
  toolFilter,
  programFilter
}: TRadarChart) => {
  if (secondEmployeeSkillsData.length === 0) {
    const mainEmployeeSorts = createSortsArray({
      skillsData: mainEmployeeSkillsData,
      progLangFilter,
      dbmsFilter,
      swTFilter,
      frameworkFilter,
      platformFilter,
      toolFilter,
      programFilter
    });
    // const dataWithoutSecondEmployee = currentRadarChartData.map((item) => {
    //   switch (item.type) {
    //     case 'Языки программирования':
    //       return { ...item, skill: progLangFilter, mainSort: mainEmployeeSorts[0], secondSort: 0 };
    //     case 'Базы данных':
    //       return { ...item, skill: dbmsFilter, mainSort: mainEmployeeSorts[1], secondSort: 0 };
    //     case 'Типы систем':
    //       return { ...item, skill: swTFilter, mainSort: mainEmployeeSorts[2], secondSort: 0 };
    //     case 'Фреймворки':
    //       return { ...item, skill: frameworkFilter, mainSort: mainEmployeeSorts[3], secondSort: 0 };
    //     case 'Платформы':
    //       return { ...item, skill: platformFilter, mainSort: mainEmployeeSorts[4], secondSort: 0 };
    //     case 'Технологии':
    //       return { ...item, skill: toolFilter, mainSort: mainEmployeeSorts[5], secondSort: 0 };
    //     case 'Инструменты':
    //       return { ...item, skill: programFilter, mainSort: mainEmployeeSorts[6], secondSort: 0 };
    //   }
    // });

    const dataWithoutSecondEmployee = createDataWithoutSecondEmployee(
      currentRadarChartData,
      [progLangFilter, dbmsFilter, swTFilter, frameworkFilter, platformFilter, toolFilter, programFilter],
      mainEmployeeSorts
    );

    const formattedSkills = dataWithoutSecondEmployee.map((skill, index) => {
      const duplicates = dataWithoutSecondEmployee.filter((s) => s.skill === skill.skill && s.type !== skill.type);
      if (duplicates.length > 0) {
        dataWithoutSecondEmployee[index].skill = `${skill.skill} (${skill.type})`;
        return skill;
      } else {
        return skill;
      }
    });

    return formattedSkills;
  } else {
    const mainEmployeeSorts = createSortsArray({
      skillsData: mainEmployeeSkillsData,
      progLangFilter,
      dbmsFilter,
      swTFilter,
      frameworkFilter,
      platformFilter,
      toolFilter,
      programFilter
    });
    // const dataWithoutSecondEmployee = currentRadarChartData.map((item) => {
    //   if (item.type === 'Языки программирования') {
    //     return { ...item, skill: progLangFilter, mainSort: mainEmployeeSorts[0] };
    //   } else if (item.type === 'Базы данных') {
    //     return { ...item, skill: dbmsFilter, mainSort: mainEmployeeSorts[1] };
    //   } else if (item.type === 'Типы систем') {
    //     return { ...item, skill: swTFilter, mainSort: mainEmployeeSorts[2] };
    //   } else if (item.type === 'Фреймворки') {
    //     return { ...item, skill: frameworkFilter, mainSort: mainEmployeeSorts[3] };
    //   } else if (item.type === 'Платформы') {
    //     return { ...item, skill: platformFilter, mainSort: mainEmployeeSorts[4] };
    //   } else if (item.type === 'Технологии') {
    //     return { ...item, skill: toolFilter, mainSort: mainEmployeeSorts[5] };
    //   } else if (item.type === 'Инструменты') {
    //     return { ...item, skill: programFilter, mainSort: mainEmployeeSorts[6] };
    //   }
    // });

    const dataWithoutSecondEmployee = createDataWithoutSecondEmployee(
      currentRadarChartData,
      [progLangFilter, dbmsFilter, swTFilter, frameworkFilter, platformFilter, toolFilter, programFilter],
      mainEmployeeSorts
    );

    const secondEmployeeSorts = createSortsArray({
      skillsData: secondEmployeeSkillsData,
      progLangFilter,
      dbmsFilter,
      swTFilter,
      frameworkFilter,
      platformFilter,
      toolFilter,
      programFilter
    });

    let dataWithSecondEmployee;

    dataWithSecondEmployee = dataWithoutSecondEmployee.map((item) => {
      switch (item.type) {
        case 'Языки программирования':
          return { ...item, secondSort: secondEmployeeSorts[0] === undefined ? 0 : secondEmployeeSorts[0] };
        case 'Базы данных':
          return { ...item, secondSort: secondEmployeeSorts[1] === undefined ? 0 : secondEmployeeSorts[1] };
        case 'Типы систем':
          return { ...item, secondSort: secondEmployeeSorts[2] === undefined ? 0 : secondEmployeeSorts[2] };
        case 'Фреймворки':
          return { ...item, secondSort: secondEmployeeSorts[3] === undefined ? 0 : secondEmployeeSorts[3] };
        case 'Платформы':
          return { ...item, secondSort: secondEmployeeSorts[4] === undefined ? 0 : secondEmployeeSorts[4] };
        case 'Технологии':
          return { ...item, secondSort: secondEmployeeSorts[5] === undefined ? 0 : secondEmployeeSorts[5] };
        case 'Инструменты':
          return { ...item, secondSort: secondEmployeeSorts[6] === undefined ? 0 : secondEmployeeSorts[6] };
      }
    });

    const formattedSkills = dataWithSecondEmployee.map((skill, index) => {
      const duplicates = dataWithSecondEmployee.filter((s) => s.skill === skill.skill && s.type !== skill.type);
      if (duplicates.length > 0) {
        dataWithSecondEmployee[index].skill = `${skill.skill} (${skill.type})`;
        return skill;
      } else {
        return skill;
      }
    });

    return formattedSkills;
  }
};

export const mapEmployeeData = (data) => {
  const mappedData = data.map((el) => {
    return {
      name: `${el.name} ${el.surname}`,
      email: el.email,
      department: el.department,
      position: el.position,
      skillType: el.skill_type,
      skillName: el.skill_name,
      sort: el.sort,
      skillGrade: el.grade,
      employeeId: el.e_id
    };
  });

  return mappedData;
};

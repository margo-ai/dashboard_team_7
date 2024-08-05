export type TMappedData = {
  department: string;
  email: string;
  name: string;
  position: string;
  skillGrade: string;
  skillName: string;
  skillType: string;
  sort: number;
  employeeId: number;
}[];

export type TSkillsUpEmployeesWithCert = { quarter: number; e_id: number; quantity_with_cer: number }[];

export type TSkillsUpEmployeesWithoutCert = { quarter: number; e_id: number; quantity_without_cer: number }[];

export type TAvgSkills = { quarter: number; e_id: number; skill_id: number }[];

export type TLowestSkillsIds = Array<number>;

export type TLowestSkills = {
  skill_id: number;
  skill_name: string;
  grade_name: string;
  e_id: number;
  sort: number;
}[];

export type TSkillsData = {
  skillType: string;
  data: {
    sort: number;
    skill: string;
    grade: string;
  }[];
};

export type TEmployee = {
  department: string;
  email: string;
  gradeLevelEexp: string;
  name: string;
  position: string;
  skill: string;
  skillDetail: string;
  sort: number;
  employeeId: number;
}[];

export type TRadarChartData = { type: string; skill: string; mainSort: number; secondSort?: number }[];

export type TRequestParams = {
  dimensions: string[];
  measures?: string[];
  filters: { [key: string]: string | (number | string | (string | number)[])[] };
  requestName: string;
};

export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}

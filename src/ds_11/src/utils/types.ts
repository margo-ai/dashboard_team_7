export type TMappedData = {
  department: string;
  email: string;
  name: string;
  position: string;
  skillGrade: string;
  skillName: string;
  skillType: string;
  sort: number;
}[];

export type TSkillsUpEmployees = { quarter: string; employee_id: number }[];

export type TAvgSkills = { quarter: string; employee_id: number; skill_id: number }[];

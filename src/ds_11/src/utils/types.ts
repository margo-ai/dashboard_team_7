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

export type TSkillsUpEmployeesWithCert = { quarter: number; e_id: number; quantity_with_cer: number }[];

export type TSkillsUpEmployeesWithoutCert = { quarter: number; e_id: number; quantity_without_cer: number }[];

export type TAvgSkills = { quarter: number; e_id: number; skill_id: number }[];

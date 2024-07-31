import React, { useEffect, useState } from 'react';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

import './infoBlock.scss';
import { EmployeesCountIcon } from '../ui/iconsComponents/EmployeesCountIcon/EmployeesCountIcon';
import { CertificatesStatistickBlock } from '../CertificatesStatisticBlock/CertificatesStatistickBlock';
import { CertificateIcon } from '../ui/iconsComponents/CertificateIcon/CertificateIcon';
import { CircleIcon } from '../ui/iconsComponents/CircleIcon/CircleIcon';
import { useAppSelector } from '../../utils/hooks';

export const InfoBlock = () => {
  const currentYear = useAppSelector((state) => state.currentFilters.year);

  const [employeesCount, setEmployeesCount] = useState<number>(0);

  const [currentYearSkills, setCurrentYearSkills] = useState(0);
  const [lastYearSkills, setLastYearSkills] = useState(0);

  const [currentYearEmployees, setCurrentYearEmployees] = useState(0);
  const [lastYearEmployees, setLastYearEmployees] = useState(0);

  const [skillsUpgrade, setSkillsUpgrade] = useState([]);
  const [employeesUpgrade, setEmployeesUpgrade] = useState([]);

  useEffect(() => {
    koobDataRequest3(
      'etl_db_7.department_koob_1',
      ['count(distinct(employee_id))'],
      [],
      {
        y: ['=', currentYear],
        rank_grade: ['=', 1],
        quarter: ['=', '4']
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      setEmployeesCount(res[0].employee_id);
    });

    koobDataRequest3(
      'etl_db_7.department_koob_1',
      ['count(skill_id)'],
      [],
      {
        y: ['=', currentYear],
        quarter: ['=', '4']
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      setCurrentYearSkills(res[0].skill_id);
    });

    koobDataRequest3(
      'etl_db_7.department_koob_1',
      ['count(skill_id)'],
      [],
      {
        y: ['=', currentYear - 1],
        quarter: ['=', '4']
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      setLastYearSkills(res[0].skill_id);
    });

    koobDataRequest3(
      'etl_db_7.department_koob_1',
      ['count(distinct(employee_id))'],
      [],
      {
        y: ['=', currentYear],
        quarter: ['=', '4']
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      setCurrentYearEmployees(res[0].employee_id);
    });

    koobDataRequest3(
      'etl_db_7.department_koob_1',
      ['count(distinct(employee_id))'],
      [],
      {
        y: ['=', currentYear - 1],
        quarter: ['=', '4']
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      setLastYearEmployees(res[0].employee_id);
    });
  }, [currentYear]);

  useEffect(() => {
    if (!!currentYearSkills && !!lastYearSkills && !!currentYearEmployees && !!lastYearEmployees) {
      const skillsDifference = (((currentYearSkills - lastYearSkills) / lastYearSkills) * 100).toFixed(2);
      const employeesDifference = (((currentYearEmployees - lastYearEmployees) / lastYearEmployees) * 100).toFixed(2);

      const skillsData = [currentYearSkills, skillsDifference];
      const employeesData = [currentYearEmployees, employeesDifference];
      setSkillsUpgrade(skillsData);
      setEmployeesUpgrade(employeesData);
    }
  }, [currentYearSkills, lastYearSkills, currentYearEmployees, lastYearEmployees]);

  return (
    <div className="infoBlock">
      <div className="employeesCountBlock">
        <div className="employeesCountBlock__icon">
          <EmployeesCountIcon />
        </div>
        <div className="employeesCountBlock__details">
          <div className="employeesCountBlock__count">{!!employeesCount ? employeesCount : 0}</div>
          <div className="employeesCountBlock__title">сотрудников</div>
        </div>
      </div>
      <div className="statisticBlock">
        {skillsUpgrade.length !== 0 && (
          <CertificatesStatistickBlock count={skillsUpgrade[0]} percent={skillsUpgrade[1]} title="повышение грейдов">
            <CertificateIcon />
          </CertificatesStatistickBlock>
        )}
        {employeesUpgrade.length !== 0 && (
          <CertificatesStatistickBlock
            count={employeesUpgrade[0]}
            percent={employeesUpgrade[1]}
            title="сотрудники с повышением грейда"
          >
            <CircleIcon />
          </CertificatesStatistickBlock>
        )}
      </div>
      <div className="explanation">
        <span className="explanation__plus">Прирост</span> и <span className="explanation__minus">спад</span> в
        сравнении с <span style={{ textDecoration: 'underline' }}>предыдущим периодом</span>
      </div>
    </div>
  );
};

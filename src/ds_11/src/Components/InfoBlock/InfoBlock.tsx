import React, { useEffect, useState } from 'react';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

import { CertificatesStatistickBlock } from '../CertificatesStatisticBlock/CertificatesStatistickBlock';
import { CertificateIcon } from '../ui/iconsComponents/CertificateIcon/CertificateIcon';
import { CircleIcon } from '../ui/iconsComponents/CircleIcon/CircleIcon';

import { useAppSelector } from '../../utils/hooks';
import { createRequestFilters } from '../../utils/helpers';

import './infoBlock.scss';

export const InfoBlock = () => {
  const currentYear = useAppSelector((state) => state.currentFilters.year);
  const currentDepartment = useAppSelector((state) => state.currentFilters.department);
  const currentSkillType = useAppSelector((state) => state.currentFilters.skillType);

  const [currentYearSkills, setCurrentYearSkills] = useState(0);
  const [lastYearSkills, setLastYearSkills] = useState(0);

  const [currentYearEmployees, setCurrentYearEmployees] = useState(0);
  const [lastYearEmployees, setLastYearEmployees] = useState(0);

  const [skillsUpgrade, setSkillsUpgrade] = useState([]);
  const [employeesUpgrade, setEmployeesUpgrade] = useState([]);

  useEffect(() => {
    koobDataRequest3(
      'etl_db_7.department_koob',
      ['count(skill_id)'],
      [],
      {
        y: ['=', currentYear],
        data_type: ['=', 'актуальные'],
        '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType })
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      setCurrentYearSkills(res[0].skill_id);
    });

    koobDataRequest3(
      'etl_db_7.department_koob',
      ['count(skill_id)'],
      [],
      {
        y: ['=', currentYear - 1],
        data_type: ['=', 'актуальные'],
        '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType })
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      setLastYearSkills(res[0].skill_id);
    });

    koobDataRequest3(
      'etl_db_7.department_koob',
      ['count(distinct(e_id))'],
      [],
      {
        y: ['=', currentYear],
        data_type: ['=', 'актуальные'],
        '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType })
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      setCurrentYearEmployees(res[0].e_id);
    });

    koobDataRequest3(
      'etl_db_7.department_koob',
      ['count(distinct(e_id))'],
      [],
      {
        y: ['=', currentYear - 1],
        data_type: ['=', 'актуальные'],
        '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType })
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      setLastYearEmployees(res[0].e_id);
    });
  }, [currentYear, currentDepartment, currentSkillType]);

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

import React, { useEffect, useState } from 'react';

import { CertificatesStatistickBlock } from '../CertificatesStatisticBlock';
import { CertificateIcon } from '../../ui/iconsComponents/CertificateIcon';
import { CircleIcon } from '../../ui/iconsComponents/CircleIcon';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { createRequestFilters } from '../../../utils/helpers';

import {
  fetchCurrentYearEmployees,
  fetchCurrentYearSkills,
  fetchLastYearEmployees,
  fetchLastYearSkills
} from '../../../slices/actualDataSlice';

import './infoBlock.scss';

export const InfoBlock = () => {
  const dispatch = useAppDispatch();

  const currentYear = useAppSelector((state) => state.currentFilters.year);
  const currentDepartment = useAppSelector((state) => state.currentFilters.department);
  const currentSkillType = useAppSelector((state) => state.currentFilters.skillType);

  const currentYearSkills = useAppSelector((state) => state.actualData.currentYearSkills);
  const lastYearSkills = useAppSelector((state) => state.actualData.lastYearSkills);

  const currentYearEmployees = useAppSelector((state) => state.actualData.currentYearEmployees);
  const lastYearEmployees = useAppSelector((state) => state.actualData.lastYearEmployees);

  const [skillsUpgrade, setSkillsUpgrade] = useState([]);
  const [employeesUpgrade, setEmployeesUpgrade] = useState([]);

  useEffect(() => {
    dispatch(
      fetchCurrentYearSkills({
        dimensions: ['count(skill_id)'],
        filters: {
          y: ['=', currentYear],
          data_type: ['=', 'актуальные'],
          '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType })
        },
        requestName: 'currentYearSkillsData'
      })
    );
    dispatch(
      fetchLastYearSkills({
        dimensions: ['count(skill_id)'],
        filters: {
          y: ['=', currentYear - 1],
          data_type: ['=', 'актуальные'],
          '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType })
        },
        requestName: 'lastYearSkillsData'
      })
    );

    dispatch(
      fetchCurrentYearEmployees({
        dimensions: ['count(distinct(e_id))'],
        filters: {
          y: ['=', currentYear],
          data_type: ['=', 'актуальные'],
          '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType })
        },
        requestName: 'currentYearEmployeesData'
      })
    );

    dispatch(
      fetchLastYearEmployees({
        dimensions: ['count(distinct(e_id))'],
        filters: {
          y: ['=', currentYear - 1],
          data_type: ['=', 'актуальные'],
          '': createRequestFilters({ department: currentDepartment, skillType: currentSkillType })
        },
        requestName: 'lastYearEmployeesData'
      })
    );
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

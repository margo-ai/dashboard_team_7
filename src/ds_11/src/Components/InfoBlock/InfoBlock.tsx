import React from 'react';

import './infoBlock.scss';
import { EmployeesCountIcon } from '../ui/EmployeesCountIcon/EmployeesCountIcon';
import { CertificatesStatistickBlock } from '../CertificatesStatisticBlock/CertificatesStatistickBlock';
import { CertificateIcon } from '../ui/CertificateIcon/CertificateIcon';
import { CircleIcon } from '../ui/CircleIcon/CircleIcon';

export const InfoBlock = () => {
  return (
    <div className="infoBlock">
      <div className="employeesCountBlock">
        <div className="employeesCountBlock__icon">
          <EmployeesCountIcon />
        </div>
        <div className="employeesCountBlock__details">
          <div className="employeesCountBlock__count">1000</div>
          <div className="employeesCountBlock__title">сотрудников</div>
        </div>
      </div>
      <div className="statisticBlock">
        <CertificatesStatistickBlock count={10} percent={5.5} title="сертификаты" isPercentPlus>
          <CertificateIcon />
        </CertificatesStatistickBlock>
        <CertificatesStatistickBlock count={10} percent={2.5} title="сотрудники и сертификаты">
          <CircleIcon />
        </CertificatesStatistickBlock>
      </div>
      <div className="explanation">
        <span className="explanation__plus">Прирост</span> и <span className="explanation__minus">спад</span> в
        сравнении с <span style={{ textDecoration: 'underline' }}>предыдущим периодом</span>
      </div>
    </div>
  );
};

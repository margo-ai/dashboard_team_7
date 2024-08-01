import React from 'react';

import './certificatesStatisticBlock.scss';
import { CertificateIcon } from '../ui/iconsComponents/CertificateIcon/CertificateIcon';

type Props = {
  count: number;
  percent: string;
  title: string;
  children: React.ReactNode;
};

export const CertificatesStatistickBlock = ({ count, percent, title, children }: Props) => {
  return (
    <div className="certificatesStatistickBlock">
      <div className="certificatesStatistickBlock__info">
        <div className="certificatesStatistickBlock__icon">{children}</div>
        <div className="certificatesStatistickBlock__details">
          <div className="certificatesStatistickBlock__count">{count}</div>
          <div
            className={`${
              percent[0] === '-'
                ? 'certificatesStatistickBlock__percent percent-minus'
                : 'certificatesStatistickBlock__percent percent-plus'
            }`}
          >
            {percent[0] === '-' ? percent.slice(1) : percent}%
          </div>
        </div>
      </div>
      <div className="certificatesStatistickBlock__title">{title}</div>
    </div>
  );
};

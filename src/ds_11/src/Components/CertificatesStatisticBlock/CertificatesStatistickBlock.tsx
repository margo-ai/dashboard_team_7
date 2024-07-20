import React from 'react';

import './certificatesStatisticBlock.scss';
import { CertificateIcon } from '../ui/CertificateIcon/CertificateIcon';

type Props = {
  count: number;
  percent: number;
  title: string;
  children: React.ReactNode;
  isPercentPlus?: boolean;
};

export const CertificatesStatistickBlock = ({ count, percent, title, children, isPercentPlus }: Props) => {
  return (
    <div className="certificatesStatistickBlock">
      <div className="certificatesStatistickBlock__info">
        <div className="certificatesStatistickBlock__icon">{children}</div>
        <div className="certificatesStatistickBlock__details">
          <div className="certificatesStatistickBlock__count">{count}</div>
          <div
            className={`${
              isPercentPlus
                ? 'certificatesStatistickBlock__percent percent-plus'
                : 'certificatesStatistickBlock__percent percent-minus'
            }`}
          >
            {percent}%
          </div>
        </div>
      </div>
      <div className="certificatesStatistickBlock__title">{title}</div>
    </div>
  );
};

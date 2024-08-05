import React from 'react';

import { ResetFiltersButton } from '../../ui/ResetFiltersButton';
import { TMappedData } from '../../../utils/types';

type Props = {
  employeeData: TMappedData;
  comparisonEmployeeData: TMappedData;
  handleResetButton: () => void;
};

export const LegendAndResetButtonBlock = ({ employeeData, comparisonEmployeeData, handleResetButton }: Props) => {
  return (
    <div className="legendAndResetButtonBlock">
      {employeeData.length !== 0 ? (
        <div className="legendBlock">
          <div className="legendBlock__item">
            <div className="legendBlock__color" style={{ backgroundColor: '#FFA5CB' }} />
            <div className="legendBlock__name">{employeeData[0].name}</div>
          </div>
          {comparisonEmployeeData.length !== 0 && (
            <div className="legendBlock__item">
              <div className="legendBlock__color" style={{ backgroundColor: '#0083FB' }} />
              <div className="legendBlock__name">{comparisonEmployeeData[0].name}</div>
            </div>
          )}
        </div>
      ) : null}
      <ResetFiltersButton resetFunc={handleResetButton} />
    </div>
  );
};

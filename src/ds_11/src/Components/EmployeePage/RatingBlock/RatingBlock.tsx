import React from 'react';

import { useAppSelector } from '../../../utils/hooks';

import './ratingBlock.scss';

export const RatingBlock = () => {
  const employeeRank = useAppSelector((state) => state.employeeRank.rank);
  const loadingError = useAppSelector((state) => state.employeeRank.loadingError);
  return (
    <div className="ratingBlock">
      {loadingError === null ? (
        <div className="ratingBlock__ratingCircle">
          {!!employeeRank ? (
            <>
              <div style={{ marginBottom: '35px' }}> Место в рейтинге по пройденным курсам </div>
              <div style={{ fontSize: '48px' }}>{employeeRank}/20</div>
            </>
          ) : (
            'Данный сотрудник не проходил курсы'
          )}
        </div>
      ) : (
        loadingError
      )}
    </div>
  );
};

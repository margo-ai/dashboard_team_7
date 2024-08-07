import React from 'react';

import './resetCrossIcon.scss';

export const ResetCrossIcon = () => {
  return (
    <div className="resetCrossIcon">
      <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 1.5L1 9.5M1 1.5L9 9.5"
          stroke="#565656"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

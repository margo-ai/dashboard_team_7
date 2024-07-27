import React from 'react';

import { ResetFiltersIcon } from '../ui/iconsComponents/ResetFiltersIcon/ResetFiltersIcon';

import './resetFiltersButton.scss';

type Props = {
  resetFunc: () => void;
};

export const ResetFiltersButton = ({ resetFunc }: Props) => {
  const handleButton = () => {
    resetFunc();
  };
  return (
    <button onClick={handleButton} type="button" className="resetFiltersButton">
      <ResetFiltersIcon />
    </button>
  );
};

import React from 'react';

import { ResetFiltersIcon } from '../ui/iconsComponents/ResetFiltersIcon/ResetFiltersIcon';

import './resetFiltersButton.scss';

export const ResetFiltersButton = () => {
  return (
    <button type="button" className="resetFiltersButton">
      <ResetFiltersIcon />
    </button>
  );
};

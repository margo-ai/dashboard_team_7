import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { DropdownIcon } from '../ui/iconsComponents/DropdownIcon/DropdownIcon';
import { DropdownUpIcon } from '../ui/iconsComponents/DropdownUpIcon/DropdownUpIcon';

import './selectFilters.scss';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';

type Props = {
  options: { name: string; value: string }[];
  setSelectedFilter: ActionCreatorWithPayload<any, string>;
  placeholder?: string;
  selectedFilter;
};

export const SelectFilters = ({ options, setSelectedFilter, selectedFilter }: Props) => {
  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState(options[0].value);

  useEffect(() => {
    if (selectedFilter === options[0].value) {
      setSelectedOption(options[0].value);
    }
  }, [selectedFilter]);

  useEffect(() => {
    dispatch(setSelectedFilter(selectedOption));
  }, [selectedOption]);

  return (
    <div className="selectFilter">
      <Dropdown
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.value)}
        options={options}
        optionLabel="name"
        // placeholder={placeholder}
        dropdownIcon={(opts) => {
          return opts.iconProps['data-pr-overlay-visible'] ? <DropdownUpIcon /> : <DropdownIcon />;
        }}
      />
    </div>
  );
};

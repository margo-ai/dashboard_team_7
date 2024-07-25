import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { DropdownIcon } from '../ui/iconsComponents/DropdownIcon/DropdownIcon';
import { DropdownUpIcon } from '../ui/iconsComponents/DropdownUpIcon/DropdownUpIcon';

import './selectFilters.scss';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';

type Props = {
  options: { name: string; value: string }[];
  setSelectedFilter: ActionCreatorWithPayload<any, string>;
};

export const SelectFilters = ({ options, setSelectedFilter }: Props) => {
  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    console.log(selectedOption);
    setSelectedOption(options[0].value);
  }, []);

  useEffect(() => {
    console.log(selectedOption);
    dispatch(setSelectedFilter(selectedOption));
  }, [selectedOption]);

  return (
    <div className="selectFilter">
      <Dropdown
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.value)}
        options={options}
        optionLabel="name"
        // placeholder="Select a City"
        // defaultValue={departments[0].value}
        dropdownIcon={(opts) => {
          return opts.iconProps['data-pr-overlay-visible'] ? <DropdownUpIcon /> : <DropdownIcon />;
        }}
      />
    </div>
  );
};

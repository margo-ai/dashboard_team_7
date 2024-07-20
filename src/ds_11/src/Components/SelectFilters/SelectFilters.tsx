import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { DropdownIcon } from '../ui/DropdownIcon/DropdownIcon';
import { DropdownUpIcon } from '../ui/DropdownUpIcon/DropdownUpIcon';

import './selectFilters.scss';

export const SelectFilters = () => {
  const departments = [
    { name: 'Все отделы', value: 'all' },
    { name: 'Отдел1', value: 'first' },
    { name: 'Отдел2', value: 'second' },
    { name: 'Отдел3', value: 'third' }
  ];

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    console.log(selectedDepartment);
    setSelectedDepartment(departments[0].value);
  }, []);

  useEffect(() => {
    console.log(selectedDepartment);
  }, [selectedDepartment]);

  return (
    <div className="selectFilter">
      <Dropdown
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.value)}
        options={departments}
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

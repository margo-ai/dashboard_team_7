import React, { useEffect, useState } from 'react';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';

import { ResetCrossIcon } from '../iconsComponents/ResetCrossIcon/ResetCrossIcon';

import './searchInput.scss';
import { setEmployeeData } from '../../../reducers/employeesSlice';
import { setEmployeeSkills, setComparisonEmployeeSkills } from '../../../reducers/skillsSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { sortSkillsArray } from '../../../utils/helpers';

const changeFirstLetterToUpperCase = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

type Props = {
  setDataFunc: (mappedData: any) => void;
  isMainEmployee?: boolean;
  handleClearFunc: (setSearchTerm: React.Dispatch<React.SetStateAction<string>>) => void;
};

export const SearchInput = ({ setDataFunc, handleClearFunc }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useAppDispatch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Поиск по:', searchTerm);
    // setSearchTerm('');
    const searchArray = searchTerm.split(' ');
    console.log(searchArray);

    koobDataRequest3(
      'etl_db_7.employee_koob',
      ['name', 'surname', 'skill_name', 'skill_type', 'email', 'department', 'position', 'grade', 'sort'],
      [],
      {
        surname: ['=', changeFirstLetterToUpperCase(searchArray[1])],
        name: ['=', changeFirstLetterToUpperCase(searchArray[0])],
        highest_grade: ['=', '1']
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      // console.log({ res });
      const mappedData = res.map((el, i) => {
        return {
          name: `${el.name} ${el.surname}`,
          email: el.email,
          department: el.department,
          position: el.position,
          skillType: el.skill_type,
          skillName: el.skill_name,
          sort: el.sort,
          skillGrade: el.grade
        };
      });

      console.log({ mapped: mappedData });
      setDataFunc(mappedData);
    });
  };

  const handleClearInput = () => {
    handleClearFunc(setSearchTerm);
  };

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <input
        className="searchForm__input"
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="searchForm__reset-button" type="reset" onClick={handleClearInput}>
        <ResetCrossIcon />
      </button>
    </form>
  );
};

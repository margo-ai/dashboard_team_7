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
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleSearchChange = (e) => {
    setError(false);
    setErrorText('');
    setSearchTerm(e.target.value);
    // console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Поиск по:', searchTerm);
    // setSearchTerm('');
    const searchArray = searchTerm.trim().split(' ');
    console.log(searchArray);

    if (searchArray.length === 1) {
      setError(true);
      setErrorText('Введите имя и фамилию');
      console.log('Введите имя и фамилию');
    } else {
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
        console.log({ res });

        if (res.length === 0) {
          setError(true);
          setErrorText('Сотрудник не найден');
          console.log('Сотрудник не найден');
        } else {
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
        }
      });
    }
  };

  const handleClearInput = () => {
    setError(false);
    setErrorText('');
    handleClearFunc(setSearchTerm);
  };

  return (
    <>
      <form className="searchForm" onSubmit={handleSubmit}>
        <div className="searchForm__inputContainer">
          <input
            className={`${error ? 'searchForm__input input-error' : 'searchForm__input'}`}
            type="text"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="searchForm__reset-button" type="reset" onClick={handleClearInput}>
            <ResetCrossIcon />
          </button>
          <div className="searchForm__error" style={{ fontSize: '18px', display: `${error ? 'block' : 'none'}` }}>
            {errorText}
          </div>
        </div>
      </form>
    </>
  );
};

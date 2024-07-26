import React, { useEffect } from 'react';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

import { SearchInput } from '../ui/SearchInput/SearchInput';
import { EmployeeInfoTitle } from '../EmployeeInfoTitle/EmployeeInfoTitle';
import { EmployeeTitleIcon } from '../ui/iconsComponents/EmployeeTitleIcon/EmployeeTitleIcon';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import './employeeSection.scss';
import { setEmployeeData } from '../../reducers/employeesSlice';

export const EmployeeSection = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.employee.employeeData);

  useEffect(() => {
    console.log({ data: data });
  }, [data]);

  return (
    <section className="employeeSection">
      <SearchInput setDataFunc={setEmployeeData} isMainEmployee />
      <div className="employeeSection__info">
        <EmployeeInfoTitle title="Сотрудник" width={271}>
          <EmployeeTitleIcon />
        </EmployeeInfoTitle>
        <ul className="employeeDetails">
          {data.length !== 0 ? (
            <>
              <li className="employeeDetails__item">{data[0].name}</li>
              <li className="employeeDetails__item">Контактная инф.: {data[0].email}</li>
              <li className="employeeDetails__item">Департамент: {data[0].department}</li>
              <li className="employeeDetails__item">Должность: {data[0].position}</li>
            </>
          ) : (
            <>Введите корректное имя сотрудника</>
          )}
        </ul>
      </div>
    </section>
  );
};

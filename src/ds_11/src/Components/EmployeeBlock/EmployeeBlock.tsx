import React from 'react';

import './employeeBlock.scss';
import { SearchInput } from '../ui/SearchInput/SearchInput';
import { EmployeeInfoTitle } from '../EmployeeInfoTitle/EmployeeInfoTitle';
import { EmployeeTitleIcon } from '../ui/EmployeeTitleIcon/EmployeeTitleIcon';

export const EmployeeBlock = () => {
  return (
    <div className="employeeBlock">
      <SearchInput />
      <EmployeeInfoTitle title="Сотрудник" width={271}>
        <EmployeeTitleIcon />
      </EmployeeInfoTitle>
      <ul className="employeeDetails">
        <li className="employeeDetails__item">Иванов Иван Иванович</li>
        <li className="employeeDetails__item">Контактная информация</li>
        <li className="employeeDetails__item">Департамент: ХХХ</li>
        <li className="employeeDetails__item">Должность: ХХХ</li>
      </ul>
    </div>
  );
};

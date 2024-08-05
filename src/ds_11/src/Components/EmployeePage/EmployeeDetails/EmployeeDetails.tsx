import React from 'react';

import { useAppSelector } from '../../../utils/hooks';

import './employeeDetails.scss';

export const EmployeeDetails = () => {
  const employeeData = useAppSelector((state) => state.employees.employeeData);
  return (
    <ul className="employeeDetails">
      {employeeData.length !== 0 ? (
        <>
          <li className="employeeDetails__item">{employeeData[0].name}</li>
          <li className="employeeDetails__item">Контактная инф.: {employeeData[0].email}</li>
          <li className="employeeDetails__item">Департамент: {employeeData[0].department}</li>
          <li className="employeeDetails__item">Должность: {employeeData[0].position}</li>
        </>
      ) : (
        <>Введите корректное имя сотрудника</>
      )}
    </ul>
  );
};

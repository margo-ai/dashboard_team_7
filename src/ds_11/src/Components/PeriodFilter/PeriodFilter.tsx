import React, { useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';

import { minMaxDatesForCalendar } from '../../utils/constants';

import './periodFilter.scss';

import { setYearFilter } from '../../reducers/filtersReducer';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

type Props = {
  year: Date;
  setYear;
};

export const PeriodFilter = ({ year, setYear }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log({ year: year.getFullYear() });
    dispatch(setYearFilter(year.getFullYear()));
  }, [year]);

  return (
    <div className="periodFilter">
      <div className="periodFilter__title">Временной период</div>
      <div className="periodFilter__input">
        <Calendar
          value={year}
          readOnlyInput
          hideOnRangeSelection
          onChange={(e) => setYear(e.value)}
          view="year"
          dateFormat="yy"
          minDate={minMaxDatesForCalendar[0]}
          maxDate={minMaxDatesForCalendar[1]}
        />
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { Calendar } from 'primereact/calendar';

import { minMaxDatesForCalendar } from '../../utils/constants';

import { setYearFilter } from '../../slices/currentFiltersReducer';
import { useAppDispatch } from '../../utils/hooks';

import './periodFilter.scss';

type Props = {
  year: Date;
  setYear: React.Dispatch<React.SetStateAction<Date>>;
};

export const PeriodFilter = ({ year, setYear }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
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

import React, { useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { localeForCalendar } from '../../utils/constants';

import './periodFilter.scss';

export const PeriodFilter = () => {
  addLocale('ru', localeForCalendar);

  const [dates, setDates] = useState([new Date('01-01-2005'), new Date('12-31-2005')]);
  useEffect(() => {
    console.log(dates);
  }, [dates]);

  return (
    <div className="periodFilter">
      <div className="periodFilter__title">Временной период</div>
      <div className="periodFilter__input">
        <Calendar
          value={dates}
          selectionMode="range"
          readOnlyInput
          hideOnRangeSelection
          onChange={(e) => setDates(e.value)}
          locale={'ru'}
          view="month"
        />
      </div>
    </div>
  );
};

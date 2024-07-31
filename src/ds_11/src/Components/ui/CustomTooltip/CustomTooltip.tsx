import React from 'react';

import './customTooltip.scss';

export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`С сертификатами : ${payload[0].value}`}</p>
        <p className="label">{`Без сертификатов : ${payload[2].value}`}</p>
      </div>
    );
  }

  return null;
};

import React, { useEffect } from 'react';

import './customTooltip.scss';

export const CustomTooltip = ({ active, payload, chartType }) => {
  if (active && payload && payload.length) {
    useEffect(() => {
      console.log({ payload });
    }, []);

    return (
      <>
        {chartType === 'bar' ? (
          <div className="customTooltip">
            <p className="customTooltip__haveCertLabel">{`С сертификатами : ${payload[0].value}%`}</p>
            <p className="customTooltip__haventCertLabel">{`Без сертификатов : ${payload[1].value}%`}</p>
          </div>
        ) : (
          <div className="customTooltip">
            <p className="customTooltip__haveCertLabel">{`С сертификатами : ${payload[0].value}`}</p>
            <p className="customTooltip__haventCertLabel">{`Без сертификатов : ${payload[1].value}`}</p>
          </div>
        )}
      </>
    );
  }

  return null;
};

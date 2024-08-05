import { UrlState } from 'bi-internal/core';
import React from 'react';

export const Route = ({ pageName = [], children }) => {
  const stateCharts = UrlState.getModel();
  const { dboard } = stateCharts;
  if (!pageName.length && (dboard === '1' || !dboard)) return <>{children}</>;
  return dboard && pageName.includes(dboard) ? <>{children}</> : null;
};

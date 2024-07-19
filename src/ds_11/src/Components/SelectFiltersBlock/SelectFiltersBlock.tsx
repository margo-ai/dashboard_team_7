import React from 'react';

import './selectFiltersBlock.scss';

type Props = {
  children: React.ReactNode;
};

export const SelectFiltersBlock = ({ children }: Props) => {
  return <div className="selectFiltersBlock">{children}</div>;
};

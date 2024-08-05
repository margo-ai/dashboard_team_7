import React from 'react';

type Props = {
  color: string;
  children: string;
};
export const BarLegendItem = ({ color, children }: Props) => {
  return (
    <li className="skillsBarChart__legendItem" style={{ backgroundColor: color }}>
      {children}
    </li>
  );
};

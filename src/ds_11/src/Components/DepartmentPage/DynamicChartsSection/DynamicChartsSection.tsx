import React from 'react';

import { SkillsUpChart } from '../SkillsUpChart';
import { AvgSkillsChart } from '../AvgSkillsChart';
import { SelectFiltersBlock } from '../../ui/SelectFiltersBlock';
import { SelectFilters } from '../../ui/SelectFilters';

import { useAppSelector } from '../../../utils/hooks';
import { setGradeFilter } from '../../../slices/currentFiltersReducer';

import './dynamicChartsSection.scss';

export const DynamicChartsSection = () => {
  const gradeOptions = useAppSelector((state) => state.filtersOptions.grade);

  const currentGrade = useAppSelector((state) => state.currentFilters.grade);

  return (
    <section className="dynamicChartsSection">
      <SkillsUpChart />
      <AvgSkillsChart />
      <div className="dynamicChartsSection__filterAndLegend">
        {gradeOptions.length !== 0 && (
          <SelectFiltersBlock>
            <SelectFilters options={gradeOptions} setSelectedFilter={setGradeFilter} selectedFilter={currentGrade} />
          </SelectFiltersBlock>
        )}
        <div className="dynamicChartsSection__legend">
          <span className="dynamicChartsSection__haveCertSpan">получали</span> и
          <span className="dynamicChartsSection__haventCertSpan"> не получали</span> сертификаты в
          <span style={{ textDecoration: 'underline' }}> прошлом году</span>
        </div>
      </div>
    </section>
  );
};

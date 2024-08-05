import React from 'react';

import { SelectFiltersBlock } from '../../ui/SelectFiltersBlock';
import { SelectFilters } from '../../ui/SelectFilters';

import {
  setProgLang,
  setDbms,
  setFramework,
  setPlatform,
  setProgram,
  setSwT,
  setTool
} from '../../../slices/comparisonFiltersSlice';
import { useAppSelector } from '../../../utils/hooks';

type Props = {
  filtersOptions: {
    name: string;
    value: string;
  }[][];
};

export const RadarSelectFiltersBlock = ({ filtersOptions }: Props) => {
  const progLangFilter = useAppSelector((state) => state.comparisonFilters.progLang.skill);
  const dbmsFilter = useAppSelector((state) => state.comparisonFilters.dbms.skill);
  const swTFilter = useAppSelector((state) => state.comparisonFilters.swT.skill);
  const frameworkFilter = useAppSelector((state) => state.comparisonFilters.framework.skill);
  const platformFilter = useAppSelector((state) => state.comparisonFilters.paltform.skill);
  const toolFilter = useAppSelector((state) => state.comparisonFilters.tool.skill);
  const programFilter = useAppSelector((state) => state.comparisonFilters.program.skill);

  return (
    <div>
      {filtersOptions.length !== 0 && (
        <SelectFiltersBlock>
          {filtersOptions[0].length > 1 ? (
            <SelectFilters
              options={filtersOptions[0]}
              setSelectedFilter={setProgLang}
              selectedFilter={progLangFilter}
            />
          ) : null}
          {filtersOptions[1].length > 1 ? (
            <SelectFilters options={filtersOptions[1]} setSelectedFilter={setDbms} selectedFilter={dbmsFilter} />
          ) : null}
          {filtersOptions[2].length > 1 ? (
            <SelectFilters options={filtersOptions[2]} setSelectedFilter={setSwT} selectedFilter={swTFilter} />
          ) : null}
          {filtersOptions[3].length > 1 ? (
            <SelectFilters
              options={filtersOptions[3]}
              setSelectedFilter={setFramework}
              selectedFilter={frameworkFilter}
            />
          ) : null}
          {filtersOptions[4].length > 1 ? (
            <SelectFilters
              options={filtersOptions[4]}
              setSelectedFilter={setPlatform}
              selectedFilter={platformFilter}
            />
          ) : null}
          {filtersOptions[5].length > 1 ? (
            <SelectFilters options={filtersOptions[5]} setSelectedFilter={setTool} selectedFilter={toolFilter} />
          ) : null}
          {filtersOptions[6].length > 1 ? (
            <SelectFilters options={filtersOptions[6]} setSelectedFilter={setProgram} selectedFilter={programFilter} />
          ) : null}
        </SelectFiltersBlock>
      )}
    </div>
  );
};

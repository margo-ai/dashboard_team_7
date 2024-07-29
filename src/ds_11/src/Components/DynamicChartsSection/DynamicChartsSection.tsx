import React, { useEffect, useState } from 'react';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend, Label } from 'recharts';

import './dynamicChartsSection.scss';
import { CustomTooltip } from '../ui/CustomTooltip/CustomTooltip';
import { useAppSelector } from '../../utils/hooks';
import { transformSkillsUpChartData } from '../../utils/helpers';

type TSkillsUpEmployees = { quarter: string; employee_id: number }[];

export const DynamicChartsSection = () => {
  const [allEmployeesNumber, setAllEmployeesNumber] = useState(0);
  const [haveCertEmployees, setHaveCertEmployees] = useState<TSkillsUpEmployees>([]);
  const [haventCertEmployees, setHaventCertEmployees] = useState<TSkillsUpEmployees>([]);
  const [skillUpChartData, setSkillUpChartData] = useState([]);

  const year = useAppSelector((state) => state.filters.year);

  useEffect(() => {
    koobDataRequest3(
      'etl_db_7.department_koob_1',
      ['quarter'],
      ['count(employee_id)'],
      {
        y: ['=', year],
        cer_flag: ['=', 1],
        data_type: ['=', 'актуальные'],
        '': ['=', ['column', 'grade_name'], 'Middle']
      },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res: TSkillsUpEmployees) => {
      console.log({ res });
      setHaveCertEmployees(res);
    });

    koobDataRequest3(
      'etl_db_7.department_koob_1',
      ['quarter'],
      ['count(employee_id)'],
      { y: ['=', year], cer_flag: ['=', 0], data_type: ['=', 'актуальные'] },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res2: TSkillsUpEmployees) => {
      console.log({ res2 });
      setHaventCertEmployees(res2);
    });
  }, [year]);

  useEffect(() => {
    const result = transformSkillsUpChartData(haveCertEmployees, haventCertEmployees);
    console.log({ result });

    setSkillUpChartData(result);
  }, [haveCertEmployees, haventCertEmployees]);

  const percentageFormatter = (value) => {
    return `${value}%`;
  };

  return (
    <div className="dynamicGraphicsSection">
      <div className="skillsUpChart">
        <h2 className="skillsUpChart__title">Влияние прохождения курсов на частоту улучшения навыков</h2>
        <ResponsiveContainer width="50%" height={200}>
          <BarChart data={skillUpChartData}>
            <CartesianGrid vertical={false} strokeDasharray="5" stroke="#313359" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#fff', fontSize: '11px', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              label={{ value: 'Процент повысивших', angle: -90, position: 'insideBottomLeft' }}
              domain={[0, 100]}
              tickFormatter={percentageFormatter}
              tick={{ fill: '#fff', fontSize: '12px' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip formatter={(value) => [`${value}%`, 'Процент']} />
            {/* <Tooltip content={<CustomTooltip />} /> */}
            <Bar dataKey="haventCert" fill="#31D9FE" width={30} />
            <Bar dataKey="haveCert" fill="#582CFF" width={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

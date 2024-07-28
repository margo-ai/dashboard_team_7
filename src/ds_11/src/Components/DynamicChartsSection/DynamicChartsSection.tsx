import React, { useEffect, useState } from 'react';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend, Label } from 'recharts';

import './dynamicChartsSection.scss';
import { CustomTooltip } from '../ui/CustomTooltip/CustomTooltip';

type TSkillsUpEmployees = { quarter: string; employee_id: number }[];

export const DynamicChartsSection = () => {
  const [allEmployeesNumber, setAllEmployeesNumber] = useState(0);
  const [haveCertEmployees, setHaveCertEmployees] = useState<TSkillsUpEmployees>([]);
  const [haventCertEmployees, setHaventCertEmployees] = useState<TSkillsUpEmployees>([]);
  const [skillUpChartData, setSkillUpChartData] = useState([]);

  useEffect(() => {
    koobDataRequest3(
      'etl_db_7.department_koob_1',
      ['quarter'],
      ['count(employee_id)'],
      { y: ['=', '2023'], cer_flag: ['=', 'true'] },
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
      { y: ['=', '2023'], cer_flag: ['=', 'false'] },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res2: TSkillsUpEmployees) => {
      console.log({ res2 });
      setHaventCertEmployees(res2);
    });
  }, []);

  useEffect(() => {
    if (haveCertEmployees.length !== 0 && haventCertEmployees.length !== 0) {
      console.log({ haveCertEmployees, haventCertEmployees });

      const employeesNumber = [...haveCertEmployees, ...haventCertEmployees].reduce(
        (acc, curr) => acc + curr.employee_id,
        0
      );
      console.log({ employeesNumber });

      const data = haveCertEmployees.map((item) => {
        return { name: item.quarter, haveCert: Number(((item.employee_id / employeesNumber) * 100).toFixed(2)) };
      });
      console.log({ data });

      const result = data.map((item) => {
        const foundItem = haventCertEmployees.find((el) => el.quarter === item.name);
        return { ...item, haventCert: Number(((foundItem.employee_id / employeesNumber) * 100).toFixed(2)) };
      });
      console.log({ result });

      result.sort((a, b) => {
        const quarterA = Number(a.name.slice(0, 1));
        const quarterB = Number(b.name.slice(0, 1));
        return quarterA - quarterB;
      });

      setSkillUpChartData(result);
    }
  }, [haveCertEmployees, haventCertEmployees]);

  // const dataa = [
  //   {
  //     name: '1 квартал',
  //     haveCert: 0.1,
  //     haventCert: 0.15
  //   },
  //   {
  //     name: '2 квартал',
  //     haveCert: 0.22,
  //     haventCert: 0.05
  //   },
  //   {
  //     name: '3 квартал',
  //     haveCert: 0.1,
  //     haventCert: 0.18
  //   },
  //   {
  //     name: '4 квартал',
  //     haveCert: 0.1,
  //     haventCert: 0.5
  //   }
  // ];

  const percentageFormatter = (value) => {
    return `${value}%`; // Преобразуем дробное значение в процент
  };

  // const CustomLabel = () => {
  //   <div>Процент повысивших</div>;
  // };

  return (
    <div className="dynamicGraphicsSection">
      <div className="skillsUpChart">
        <h2 className="skillsUpChart__title">Влияние прохождения курсов на частоту улучшения навыков</h2>
        <ResponsiveContainer width={650} height={200}>
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
            {/* <Tooltip formatter={(value) => [`${value}%`, 'Процент']} /> */}
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="haventCert" fill="#31D9FE" width={30} />
            <Bar dataKey="haveCert" fill="#582CFF" width={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

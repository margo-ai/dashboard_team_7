import React from 'react'
import {Cell, Pie, ResponsiveContainer, Legend, PieChart, Tooltip} from 'recharts'

import './PieChart.scss'

type PieChartType = {
  data: { id: string, value: number, name: string, color: string }[]
  dataKey?: string
  innerRadius?: string
  outerRadius?: string
}
export const PieChartComponent = (
  {
    data,
    dataKey = 'value',
    innerRadius = '70%',
    outerRadius = '100%',
  }: PieChartType
) => {
  return (
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey={dataKey} innerRadius={innerRadius} outerRadius={outerRadius}>
            {data.map((cell, index) => (
              <Cell stroke='transparent' key={`cell-${index}`} fill={cell.color}/>
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
  )
}

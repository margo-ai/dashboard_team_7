import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

// @ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { Header } from './src/Components/Header/Header';
import { SidebarNav } from './src/Components/SidebarNav/SidebarNav';
import { DepartmentPage } from './src/Pages/DepartmentPage/DepartmentPage';
import { EmployeePage } from './src/Pages/EmployeePage/EmployeePage';
const { koobDataRequest3 } = KoobDataService;

import { urlState, UrlState } from 'bi-internal/core';
import { Route } from './src/Components/Route/Route';

const COLORS = [
  '#FF5733',
  '#6600FF',
  '#00FF00',
  '#123456',
  '#FF9900',
  '#ABCDEF',
  '#00FFFF',
  '#FF00FF',
  '#654321',
  '#C0C0C0',
  '#FFCC00',
  '#112233',
  '#FF6666',
  '#55AAFF',
  '#009900',
  '#DDEEFF',
  '#9900CC',
  '#88FF00'
];
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    koobDataRequest3(
      'g_dm_test.skills_test',
      ['dt', 'name', 'skill_skill_name', 'grade'],
      ['sum(skill_grade)'],
      { user_id: ['=', '382'] },
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="App scroller">
      <Header />
      {/* <SidebarNav /> */}
      {/* <Route pageName={['1']}>
        <DepartmentPage />
      </Route>
      <Route pageName={['2']}>
        <EmployeePage />
      </Route> */}
      {/* <DepartmentPage /> */}
      <EmployeePage />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './src/store';
import './App.scss';

// @ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { Header } from './src/Components/Header/Header';
import { SidebarNav } from './src/Components/SidebarNav/SidebarNav';
import { DepartmentPage } from './src/Pages/DepartmentPage/DepartmentPage';
import { EmployeePage } from './src/Pages/EmployeePage/EmployeePage';
const { koobDataRequest3 } = KoobDataService;

import { Route } from './src/Components/Route/Route';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    koobDataRequest3(
      'etl_db_7.employee_koob',
      ['employee_id'], //размерности
      ['sum(sort)'], //факты
      {},
      { schema_name: 'ds_11' },
      'ourRequest'
    ).then((res) => {
      // console.log({ test: res });
    });
  }, []);

  return (
    <Provider store={store}>
      <div className="App scroller">
        <Route pageName={['1']}>
          <Header />
          <div style={{ display: 'flex' }}>
            <SidebarNav />
            <DepartmentPage />
          </div>
        </Route>
        <Route pageName={['2']}>
          <Header />
          <div style={{ display: 'flex' }}>
            <SidebarNav />
            <EmployeePage />
          </div>
        </Route>
      </div>
    </Provider>
  );
}

export default App;

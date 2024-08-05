import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';

import { Header } from './src/Components/Header';
import { SidebarNav } from './src/Components/SidebarNav';
import { DepartmentPage } from './src/Pages/DepartmentPage';
import { EmployeePage } from './src/Pages/EmployeePage';

import { Route } from './src/Components/Route/Route';

import './App.scss';

function App() {
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

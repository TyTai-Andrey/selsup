// Core
import * as React from 'react';
// Actions

// Selectors
import { Navigate, Route, Routes } from 'react-router-dom';

import { pathnames } from './utils';
import './App.scss';
import Main from '@pages/Main';

const App = () => {
  return (
    <Routes>
      <Route path={pathnames.main} element={<Main />} />
      <Route path="*" element={<Navigate to={pathnames.main} replace />} />
    </Routes>
  );
};

// Exports
export default App;

// Core
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Styles
import './index.scss';

import App from '@routes/App';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);

const renderApp = () =>
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
renderApp();
// KC.initKeycloak(renderApp);

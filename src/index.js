import React from 'react';
import { render } from 'react-dom';
import './assets/css/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

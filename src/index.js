import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import GlobalStyles from './index.css';

ReactDOM.render(
  <React.StrictMode>
      <GlobalStyles />
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

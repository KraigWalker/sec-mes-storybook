import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './app/store';
import './index.css';

function prepare() {
  if (process.env.NODE_ENV !== 'production') {
    const { worker } = require('./mocks/browser');

    return worker.start({
      /**
       * Don't warn the developer about every request that goes unhandled by
       * mock-service-worker (msw) in development mode.
       * This reduces the `console.warn()` spam for legitimate static asset requests
       * or dynamic `import()`s that shouldn't be mocked by msw.
       * If you find a mocked api response isn't working as you expected,
       * change this back to `'warn'` to help you debug the issue.
       */
      onUnhandledRequest: 'bypass',
    });
  }
  return Promise.resolve();
}

/**
 * The App is wrapped in all the relevant Router, Theme, and Redux Providers
 * at this level to allow the UI code to be more testable and portable in the
 * future.
 */
function startApp() {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

prepare()
  .then(() => {
    /**
     * If in development mode and @todo process.env.REACT_APP_MOCK_JWT_COOKIE
     */
    //if (process.env.NODE_ENV !== 'production') {
    //  return fetch('https://localhost:8888/mock-jwt-token');
    //}
  })
  .then(() => startApp());

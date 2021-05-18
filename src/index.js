import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './app/store';
import './index.css';

/**
 * Retrieves the runtime configuration file, session details, and mounts
 * the web app on the DOM.
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

startApp();

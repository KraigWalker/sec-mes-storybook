import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import svg4everybody from 'svg4everybody';
import AppRouter from './router/AppRouter';
import createStore from './stores/AppStore';
import { WebUIThemeProvider } from 'web-ui-components/lib/utilities/themes';
import { buildClientContext } from './utils/ContextUtils';
import 'css/main.css';

svg4everybody();

console.log('loaded cluent.js');

const app = document.getElementById('app');
/**
 * Starts the application with the Provider Wrapper from Redux
 * @return {ReactComponent} AppRouter which initiates the application.
 */

// clear hash parameters
let hash = window.customHashParam || {};
window.customHashParam = null;

if (process.env.NODE_ENV !== 'production' && Object.keys(hash).length <= 1) {
  hash = {
    access_token: '212142c8-a74e-4953-bcec-abd0442446f1',
    bank_id: 'cb',
    brandId: 'vm',
    client_context: 'CB%20Web',
    isDocumentLibraryEnabled: 'true',
    state: 'ba55b632ba0e8a63ffdca4ef3926b4da',
    user_tracking_id: '5173da20-6b30-11e9-804e-1d9cdacf2bd',
  };
}

const session = {
  access_token: hash.access_token,
  bank_id: hash.bank_id ? hash.bank_id.toUpperCase() : 'CB',
  brand: hash.brandId ? hash.brandId.toUpperCase() : 'VM',
  state: hash.state,
};

const clientContext = buildClientContext(
  decodeURIComponent(hash.client_context),
  hash.user_tracking_id,
  hash.state
);

const { isDocumentLibraryEnabled } = hash;

const isDocumentLibraryEnabledFinal = isDocumentLibraryEnabled === 'true';

const normalisedBrandId = {
  CB: 'CB',
  YB: 'YB',
  DYB: 'B',
  VM: 'VM',
}[session.brand];

function startApp(config) {
  const store = createStore(session, clientContext, config);

  ReactDOM.render(
    <Provider store={store}>
      <WebUIThemeProvider brandID={normalisedBrandId}>
        <AppRouter
          session={session}
          client={clientContext}
          isDocumentLibraryEnabled={isDocumentLibraryEnabledFinal}
        />
      </WebUIThemeProvider>
    </Provider>,
    app
  );
}

function loadStyles() {
  const head = document.getElementsByTagName('head')[0];
  const element = document.createElement('link');
  element.rel = 'stylesheet';
  element.href = `/css/app.${normalisedBrandId.toLowerCase()}.css`;
  head.appendChild(element);
}

function initApp() {
  console.log('try init app');
  fetch(`/config.json`)
    .then((response) => response.json())
    .then((data) => {
      console.dir(data);
      startApp(data);
    })
    .then(() => {
      console.log('client init success');
    });

  // This is for hot reloading on dev, so css gets loaded when window has is empty
  if (process.env.NODE_ENV !== 'production' && !window.location.hash) {
    loadStyles();
  }
}

console.log('init app');

initApp();

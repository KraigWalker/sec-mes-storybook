import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';
import ReactDOM from 'react-dom';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { lazy } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import svg4everybody from 'svg4everybody';
import AppRouter from './router/AppRouter';
import createStore from './stores/AppStore';
import { buildClientContext } from './utils/ContextUtils';
import 'css/main.css';

svg4everybody();

const WebUIThemeProvider = lazy(() =>
  import(
    /* webpackPreload: true */ 'web-ui-components/lib/utilities/themes'
  ).then((mod) => mod.WebUIThemeProvider)
);

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
    <BrowserRouter basename={window.baseURl}>
      <Provider store={store}>
        <Suspense fallback={null}>
          <WebUIThemeProvider brandID={normalisedBrandId}>
            <AppRouter
              session={session}
              client={clientContext}
              isDocumentLibraryEnabled={isDocumentLibraryEnabledFinal}
            />
          </WebUIThemeProvider>
        </Suspense>
      </Provider>
    </BrowserRouter>,
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

fetch(`/config.json`)
  .then((response) => response.json())
  .then((data) => {
    window.flagContext = {
      enableCategoryAttachmentParam:
        data.enableCategoryAttachmentParam || false,
    };
    startApp(data);
  })
  .catch((err) => console.log(err));

// This is for hot reloading on dev, so css gets loaded when window has is empty
if (process.env.NODE_ENV !== 'production' && !window.location.hash) {
  loadStyles();
}

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
import { getConfig } from './utils/ConfigUtils';
import { getSessionDetails } from './utils/SessionUtils';
import { loadStyles } from './utils/loadStyles';
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

async function startApp() {
  const config = await getConfig(`/config.json`);
  const sessionDetails = await getSessionDetails(config);

  const {
    session,
    clientContext,
    isDocumentLibraryEnabledFinal,
    normalisedBrandId,
  } = sessionDetails;
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

const initApp = () => {
  //This is for hot reloading on dev, so css gets loaded when window has is empty
  if (process.env.NODE_ENV !== 'production') {
    if (!window.location.hash) {
      loadStyles();
    }
  }
  startApp();
};
initApp();

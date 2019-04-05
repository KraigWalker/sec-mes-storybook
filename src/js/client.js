import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, compose } from "react-redux";
import svg4everybody from "svg4everybody";
import AppRouter from './router/AppRouter';
import createStore from './stores/AppStore';
import ConfigUtils from './utils/ConfigUtils';
import { WebUIThemeProvider } from "web-ui-components/lib/utilities/themes";
import { buildClientContext } from './utils/ContextUtils';
import "css/main.css";

svg4everybody();

const app = document.getElementById('app');
 /**
  * Starts the application with the Provider Wrapper from Redux
  * @return {ReactComponent} AppRouter which initiates the application.
 */
const parseHash = hash => hash
  .split("&")
  .map(v => v.split("="))
  .reduce( (pre, [key, value]) => ({ ...pre, [key]: value }), {} )

let hash;
if (process.env.NODE_ENV !== 'production')
{
  hash = {
    access_token: "access_token",
  bank_id: "CB",
  brandId: "CB",
  client_context: "CB%20Web",
  isDocumentLibraryEnabled: "true",
  state: "state",
  user_tracking_id: "23453-34343-34343"
  }
}
else
{
  hash = parseHash(window.location.hash.substring(1));
}

const session = {
  access_token: hash.access_token,
  bank_id: hash.bank_id,
  brand: hash.brandId,
  state: hash.state
};
const clientContext = buildClientContext(decodeURIComponent(hash.client_context), hash.user_tracking_id, hash.state);

const { brandId, isDocumentLibraryEnabled } = hash;
const normalisedBrandId = {
  CB: "CB",
  YB: "YB",
  DYB: "B"
}[brandId];

const startApp = () => {
  const store = createStore(session, clientContext, ConfigUtils.config)
  ReactDOM.render(
    <Provider store={store}>
      <WebUIThemeProvider brandID={normalisedBrandId}>
        <AppRouter session={session} client={clientContext} isDocumentLibraryEnabled={isDocumentLibraryEnabled} />
      </WebUIThemeProvider>
    </Provider>, app);
}

const loadStyles = () => {
  var head = document.getElementsByTagName('head')[0];
  var element = document.createElement('link');
    element.rel = 'stylesheet';
    element.href = `${path}css/app.${brandId.toLowerCase()}.css`;
    head.appendChild(element);
}

const initApp = () => {
    ConfigUtils.getConfig(startApp);
    //This is for hot reloading on dev, so css gets loaded when window has is empty
    if (process.env.NODE_ENV !== 'production' && !window.location.hash)
    {
      loadStyles()
    }
}
initApp();

// clear hash parameters
window.location.hash = '';
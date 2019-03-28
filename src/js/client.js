import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, compose } from "react-redux";
import svg4everybody from "svg4everybody";
import AppRouter from './router/AppRouter';
import createStore from './stores/AppStore';
import ConfigUtils from './utils/ConfigUtils';
import { getTheme, WebUIThemeProvider } from "web-ui-components/lib/utilities/themes";
import { buildClientContext } from './utils/ContextUtils';

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


// clear hash parameters
window.location.hash = '';


const session = {
  access_token: hash.access_token,
  bank_id: hash.bank_id,
  brand: hash.brandId,
  state: hash.state
};
const clientContext = buildClientContext(decodeURIComponent(hash.client_context), hash.user_tracking_id, hash.state);

const { brandId, isDocumentLibraryEnabled } = hash;

const startApp = () => {
  const store = createStore(session, clientContext, ConfigUtils.config)
  ReactDOM.render(
    <Provider store={store}>
      <WebUIThemeProvider brandID={brandId}>
        <AppRouter session={session} client={clientContext} isDocumentLibraryEnabled={isDocumentLibraryEnabled} />
      </WebUIThemeProvider>
    </Provider>, app);
}

const loadStyles = () => {
  console.log('load styles')
  var head = document.getElementsByTagName('head')[0];
  var element = document.createElement('link');
    element.rel = 'stylesheet';
    element.href = `${path}css/app.${brandId.toLowerCase()}.css`;
    head.appendChild(element);
    // var element2 = document.createElement('link');
    // element2.rel = 'stylesheet';
    // element2.href = `${path}${brandId.toLowerCase()}.main.css`;
    // head.appendChild(element2);
}

const initApp = () => {
    ConfigUtils.getConfig(startApp);
    loadStyles()
}
// DEBTxCYBG: this is not an ideal pattern for initialising an app.
setTimeout(initApp, 50);
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AppRouter from './router/AppRouter';
import createStore from './stores/AppStore';
import ConfigUtils from './utils/ConfigUtils';
import token from "./token";
import { getTheme, WebUIThemeProvider } from "web-ui-components/lib/utilities/themes";

const app = document.getElementById('app');
 /**
  * Starts the application with the Provider Wrapper from Redux
  * @return {ReactComponent} AppRouter which initiates the application.
 */
const parseHash = hash => hash
  .split("&")
  .map(v => v.split("="))
  .reduce( (pre, [key, value]) => ({ ...pre, [key]: value }), {} )

const hash = parseHash(window.location.hash.substring(1));

const session = {
  access_token: hash.access_token,
  bank_id: hash.bank_id,
  brand: hash.branId,
  state: hash.state
};

const clientContext = token.getClientContext();

const store = createStore(session)
const { brandId, isDocumentLibraryEnabled } = hash;
const theme = getTheme(brandId);

const startApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <WebUIThemeProvider theme={theme}>
        <AppRouter session={session} client={clientContext} isDocumentLibraryEnabled={isDocumentLibraryEnabled}/>
      </WebUIThemeProvider>
    </Provider>, app);
}

const loadStyles = () => {
  
  var head = document.getElementsByTagName('head')[0];
  var element = document.createElement('link');
  element.rel = 'stylesheet';
  element.href = `${path}${brandId.toLowerCase()}.main.css`;
  head.appendChild(element);
}

const initApp = () => {
    ConfigUtils.getConfig(startApp);
    loadStyles()
}

setTimeout(initApp, 50);
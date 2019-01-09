import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AppRouter from './router/AppRouter';
import store from './stores/AppStore';
import ConfigUtils from './utils/ConfigUtils';

const app = document.getElementById('app');
 /**
  * Starts the application with the Provider Wrapper from Redux
  * @return {ReactComponent} AppRouter which initiates the application.
 */
const parseHash = hash => hash
  .split("&")
  .map(v => v.split("="))
  .reduce( (pre, [key, value]) => ({ ...pre, [key]: value }), {} )

const startApp = () => {
  ReactDOM.render(<Provider store={store}>
  <AppRouter/>
  </Provider>, app);
}

const loadStyles = () => {
  const hash = parseHash(window.location.hash);
  console.log(hash)
  const { brandId } = hash;
  
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
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AppRouter from './router/AppRouter';
import store from './stores/AppStore';
import ConfigUtils from './utils/ConfigUtils';
// import '../scss/main.scss';
const app = document.getElementById('app');
 /**
  * Starts the application with the Provider Wrapper from Redux
  * @return {ReactComponent} AppRouter which initiates the application.
 */
const startApp = () => {
  ReactDOM.render(<Provider store={store}>
  <AppRouter/>
  </Provider>, app);
}

const initApp = () => {
  if(window.pathValue) {
    ConfigUtils.getConfig(startApp);
  } else {
    setTimeout(initApp, 50);
  }
}

setTimeout(initApp, 50);
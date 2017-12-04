import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route } from 'react-router';
import { Provider } from "react-redux";


import AppRouter from './router/AppRouter';
import store from './stores/AppStore';
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

setTimeout(startApp, 50);

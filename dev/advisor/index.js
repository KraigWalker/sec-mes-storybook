import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../../src/js/App.advisor';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

/*const loadStyles = (brandId) => {
  var head = document.getElementsByTagName('head')[0];
  var element = document.createElement('link');
  element.rel = 'stylesheet';
  element.href = `${path}css/app.${brandId.toLowerCase()}.css`; // path is undefined??
  head.appendChild(element);
};*/

function cybgSecureMessagingUI(config, id) {
  /** @todo dynamic import the appropriate theme stylesheet */
  //loadStyles(config.brandId);
  ReactDOM.render(<App config={config} />, document.getElementById(id));
}

export default cybgSecureMessagingUI;
